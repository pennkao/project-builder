import { Activity, useEffect, useRef, useState } from 'react';
import { useWS } from './useWs';
// 💬 通用 Web 聊天组件（React + Tailwind 版本，无本地依赖）
interface ChatWidgetProps {
    clientId: string;
    isOpen: boolean;
    role: string;
    onClose: () => void;
    url: string;
}

export default function ChatWidget({ clientId, role, url, isOpen, onClose }: ChatWidgetProps) {
    const { messages, send } = useWS(clientId, url, role);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;
        // if (!url) return;
        // send(input)
        send('admin', input);
        setInput('');
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        send('admin', event.target?.result as string, 'image');
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
                        <img src={m.text} onClick={() => setPreviewImage(m.text || '')} className="w-24 h-24 border border-gray-500  rounded-md" />
                    ) : (
                        <div className="px-3 py-2 rounded-2xl shadow text-sm whitespace-pre-line animate-chatMessage bg-blue-500 text-white ml-auto text-right">{m.text}</div>
                    )}
                </div>
            );
        }
        return (
            <div key={idx} className="flex justify-start">
                {m.type === 'image' ? (
                    <img src={m.text} onClick={() => setPreviewImage(m.text || '')} className="w-24 h-24 border border-gray-500  rounded-md" />
                ) : (
                    <div className="px-3 py-2 rounded-2xl shadow text-sm whitespace-pre-line animate-chatMessage bg-gray-200 text-gray-900">{m.text}</div>
                )}
                <div></div>
            </div>
        );
    };
    return (
        <Activity mode={`${isOpen ? 'visible' : 'hidden'}`}>
            {previewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-9999" onClick={() => setPreviewImage(null)}>
                    <img src={previewImage} className="max-w-[90%] max-h-[90%] rounded-lg" />
                </div>
            )}
            <div className="fixed bottom-10 right-0 w-[350px] max-w-md h-[450px] flex flex-col shadow-xl rounded-2xl border border-gray-300 bg-white z-1000">
                {/* Header */}
                <div className="p-4 border-b border-gray-300 font-semibold text-lg bg-gray-300/20 rounded-t-2xl flex items-center justify-between">
                    ID:{clientId?.slice(0, 4)}
                    <button onClick={onClose} className="bg-red-500 w-5 h-5 text-white rounded-full p-1 cursor-pointer flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((m, idx) => messageItem(m, idx))}
                    <div ref={bottomRef} />
                </div>
                {/* Input area */}
                <div className="p-3 flex items-center gap-2 border-t border-gray-300 bg-gray-50 rounded-b-2xl">
                    <input
                        className="flex-1 border  border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type your message..."
                        value={input}
                        onPaste={(e) => handlePaste(e)}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="rounded-xl p-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            // class="lucide lucide-send-icon lucide-send"
                        >
                            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                            <path d="m21.854 2.147-10.94 10.939" />
                        </svg>
                    </button>
                </div>
            </div>
        </Activity>
    );
}
