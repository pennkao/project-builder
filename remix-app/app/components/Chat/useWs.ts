import { useEffect, useRef, useState } from 'react';

export function useWS(clientId: string, url?: string) {
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);

    const role = 'site1';
    useEffect(() => {
        if (ws.current) return;
        const url = `ws://localhost:8080/wss/chat?s=${role}`;
        ws.current = new WebSocket(url);

        ws.current.onmessage = (ev) => {
            const msg = JSON.parse(ev.data);
            if (msg.type == 'message') {
                setMessages((prev) => [...prev, msg.message]);
            }
        };

        ws.current.onclose = () => {
            console.log('WS closed');
        };
        ws.current.onopen = () => {
            console.log('WS opened');
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
