import { usePost } from '@/hooks/usePost';
import { useState } from 'react';
interface ClientChatType {
    client: string;
    source: string;
    lastMessage: MessageType;
    isNew: boolean;
    startTime: number; // 或 Date
    lastTime: number; // 或 Date
}

interface MessageType {
    ts: number; // 时间戳
    source: string; // 来源（比如前端、后端等）
    from?: string; // 发送者
    to?: string; // 接收者
    text?: string; // 文本内容
    type?: string; // 可选类型 (text | image | file ...)
    url?: string; // 可选图片/文件 URL
}

export const useChat = () => {
    const [chats, setChats] = useState<ClientChatType[]>([]);
    const { doPost } = usePost('chat');

    const GetChats = () => {
        doPost({
            params: { action: 'clients' },
            callback: (data) => {
                if (data) setChats(data);
            },
        });
    };
    return { GetChats, chats };
};
