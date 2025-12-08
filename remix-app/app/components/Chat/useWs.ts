import { useEffect, useRef, useState } from 'react';
const ChatKey = '--google:vtx:ced';
export function useWS(clientId: string, baseUrl: string, role: string) {
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        if (ws.current) return;
        const chat = localStorage.getItem(ChatKey);
        if (chat == '1') return;
        const url = `${baseUrl}?s=${role}&c=${clientId}`;
        ws.current = new WebSocket(url);

        ws.current.onmessage = (ev) => {
            const msg = JSON.parse(ev.data);
            console.log(msg);
            if (msg.type == 'message') {
                if (msg.message.text == 'block') {
                    console.log(msg.messages);
                    localStorage.setItem('--google:vtx:bbk', '1');
                    window.location.href = '/';
                    return;
                }
                setMessages((prev) => [...prev, msg.message]);
            }
        };

        ws.current.onclose = (e) => {
            console.log('WS closed:', e.code, e.reason);
            // localStorage.setItem(ChatKey, '1');
        };
        ws.current.onopen = () => {
            // console.log('WS opened');
        };
    }, []);

    function send(to: string, text: string, type: 'text' | 'image' = 'text') {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
        const msg = { from: clientId, url: '', source: role, to: to, text: text, type: type, ts: Date.now() } as MessageType;
        ws.current.send(JSON.stringify(msg));
        msg.me = 1;
        setMessages((prev) => [...prev, msg]);
    }

    return { messages, send };
}
