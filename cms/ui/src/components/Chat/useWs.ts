import { useEffect, useRef, useState } from 'react';

export function useWS(apiBaseUrl: string, role: string) {
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Record<string, MessageType[]>>({});
    const [clients, setClients] = useState<ClientType[]>([]);
    useEffect(() => {
        if (ws.current) return;
        const url = `${apiBaseUrl}?s=${role}`;
        ws.current = new WebSocket(url);

        ws.current.onmessage = (ev) => {
            const msg = JSON.parse(ev.data);
            switch (msg.type) {
                case 'message':
                    setMessages((prev) => ({
                        ...prev,
                        [msg.message.from]: [...(prev[msg.message.from] || []), msg.message],
                    }));
                    break;
                case 'clients':
                    setClients(msg.message);
                    break;
            }
        };

        ws.current.onclose = () => {
            console.log('WS closed');
        };
        ws.current.onopen = () => {
            console.log('open ...');
        };
    }, []);

    function send(to: string, text: string, type: 'text' | 'image' = 'text') {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
        const msg = { from: '', url: '', source: role, to: to, text: text, type: type, ts: Date.now() } as MessageType;

        ws.current.send(JSON.stringify(msg));
        msg.me = 1;
        setMessages((prev) => ({
            ...prev,
            [to]: [...(prev[to] || []), msg],
        }));
    }

    return { messages, clients, send };
}
