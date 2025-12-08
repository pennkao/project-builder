import { config } from '@/config/config';
import { useApi } from '@/hooks/useApi';
import { useEffect, useRef, useState } from 'react';
export function useWS(role: string) {
    const { api } = useApi();
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Record<string, MessageType[]>>({});
    const [clients, setClients] = useState<ClientType[]>([]);
    useEffect(() => {
        if (ws.current) return;
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const url = config.IS_DEV ? config.WS_URL : `${protocol}//${window.location.host}${config.WS_URL}`;
        ws.current = new WebSocket(`${url}?s=${role}`);
        // ws.current = new WebSocket('ws://localhost:8080/backend/ws/chat?s=' + role);

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

        ws.current.onclose = (e) => {
            console.log('closed:', e.code, e.reason);

            // setClients(clients.filter((item) => item.source !== role));
            // console.log('WS closed');
        };
        ws.current.onopen = () => {
            console.log('open ...');
        };
    }, []);

    /**
     * 关闭WebSocket连接的函数
     * 该函数会检查是否存在当前的WebSocket连接，如果存在则关闭它
     */
    function close(addr: string) {
        if (!ws.current) return;
        api.Post('ws', { action: 'close', addr: addr }).callback(() => {
            ws.current?.close(1000, 'ssssssss');
        });
    }

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

    return { messages, clients, send, close };
}
