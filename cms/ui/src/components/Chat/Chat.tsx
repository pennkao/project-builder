import { SRC } from '@/lib/image';
import { Activity, useRef, useState } from 'react';
import { useWS } from './useWs';

interface ChatProps {
    url: string;
}

export function Chat({ url }: ChatProps) {
    const { messages, clients, send } = useWS(url, 'admin');
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const onToggle = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen((prev) => !prev);
    };
    const sendMessage = () => {
        if (!currentUser) return;
        send(currentUser, inputValue);
        setInputValue('');
    };

    const title = () => {
        if (!currentUser) return <div></div>;
        const client = clients.find((c) => c.addr === currentUser);
        if (!client) return <div></div>;
        return client?.source + ' ' + (currentUser || '') + '     -------' + client?.t.slice(11, 19);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        console.log(event.target?.result);
                        if (currentUser) {
                            send(currentUser, event.target?.result as string, 'image');
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    };

    const messageItem = (m: MessageType, idx: number) => {
        if (!m.text) return null;
        if (m.me === 1) {
            return (
                <div key={idx} className="flex justify-end">
                    <div></div>
                    {m.type === 'image' ? (
                        <img src={SRC(m.text)} onClick={() => setPreviewImage(m.text || '')} className="w-24 h-24 border border-gray-500  rounded-md" />
                    ) : (
                        <div className="px-3 py-2 rounded-2xl shadow text-sm whitespace-pre-line animate-chatMessage bg-blue-500 text-white ml-auto text-right">{m.text}</div>
                    )}
                </div>
            );
        }
        return (
            <div key={idx} className="flex justify-start">
                {m.type === 'image' ? (
                    <img src={SRC(m.text)} onClick={() => setPreviewImage(m.text || '')} className="w-24 h-24 border border-gray-500  rounded-md" />
                ) : (
                    <div className="px-3 py-2 rounded-2xl shadow text-sm whitespace-pre-line animate-chatMessage bg-gray-200 text-gray-900">{m.text}</div>
                )}
                <div></div>
            </div>
        );
    };

    return (
        <>
            {previewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-9999" onClick={() => setPreviewImage(null)}>
                    <img src={previewImage} className="max-w-[90%] max-h-[90%] rounded-lg" />
                </div>
            )}

            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-label={'Open chat'}
                className={`
        fixed right-1 top-[55%]  z-1000
        w-12 h-12 rounded-full
        flex items-center justify-center
        shadow-xl
        transition-transform duration-150
        ${isOpen ? 'scale-95' : 'hover:scale-110'}
        bg-blue-600 text-white
      `}
            >
                {/* 主图标（你可以替换为 SVG） */}
                <span className="text-xl select-none">💬</span>

                {/* 未读角标 */}
                {clients && clients.length > 0 && (
                    <span
                        className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-semibold 
                        w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                        aria-hidden="true"
                    >
                        {clients.length > 99 ? '99+' : clients.length}
                    </span>
                )}
            </button>
            <Activity mode={`${isOpen ? 'visible' : 'hidden'}`}>
                <div className="fixed bottom-10 right-0 w-[450px] h-[450px] flex shadow-xl rounded-2xl border border-gray-300 bg-white z-1000 overflow-hidden">
                    {/* ---------------- 左侧：会话列表 ---------------- */}
                    <div className="w-[120px] border-r border-gray-300 bg-gray-100 flex flex-col">
                        <div className="p-3 font-semibold border-b bg-gray-200">会话列表</div>

                        <div className="flex-1 overflow-y-auto">
                            {clients &&
                                clients.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentUser(item.addr)}
                                        className={`p-3 cursor-pointer border-b 
                                   ${currentUser === item.addr ? 'bg-blue-600 text-white font-semibold' : 'border-gray-300'}
                               `}
                                    >
                                        {item.addr}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* ---------------- 右侧：你的原有聊天窗体 ---------------- */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-300 font-semibold text-lg bg-gray-300/20 flex items-center justify-between">
                            {title()}
                            <button onClick={onClose} className="bg-red-500 w-5 h-5 text-white rounded-full p-1 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Message list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages[currentUser || '']?.map((m, idx) => messageItem(m, idx))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input area */}
                        <div className="p-3 flex items-center gap-2 border-t border-gray-300 bg-gray-50">
                            <input
                                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Type your message..."
                                disabled={currentUser == '' || currentUser == null}
                                value={inputValue}
                                onPaste={(e) => handlePaste(e)}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button onClick={sendMessage} className="rounded-xl p-2 bg-blue-500 hover:bg-blue-600 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                    <path d="m21.854 2.147-10.94 10.939" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Activity>
        </>
    );
}
