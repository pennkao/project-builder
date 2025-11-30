interface MessageType {
    ts: number; // 时间戳
    me?: number;
    source: string; // 来源（比如前端、后端等）
    from?: string; // 发送者
    to?: string; // 接收者
    text?: string; // 文本内容
    type?: string; // 可选类型 (text | image | file ...)
    url?: string; // 可选图片/文件 URL
}

interface ClientType {
    t: string; // 时间戳
    source: string;
    addr: string;
}
