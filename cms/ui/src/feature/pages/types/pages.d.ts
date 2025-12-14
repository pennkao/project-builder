interface PageType {
    id: number;
    title: string;
    handle: string;
    subtitle: string;
    sid: number; // 站点 ID
    description: string;
    stype: string; // blog | shop | forum | page ...
    content: string;
    image: string;
    status: number; // 0=draft | 1=published
    visibility: number; // 0=public | 1=private | 2=unlisted
    seo: Record<string, any>;
    meta: Record<string, any>;
    cts: number; // 创建时间
    uts: number; // 更新时间
}
