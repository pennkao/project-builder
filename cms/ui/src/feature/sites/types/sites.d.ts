interface SiteType {
    id: number; // 站点 ID
    name: string; // 站点名称
    domain: string; // 站点域名
    status: number; // 站点状态（0: 活跃, 1: 非活跃）
    stype: string; // 站点类型，如 blog/shop/forum
    site: Record<string, any>; // JSON 配置（通用字段）
    config: Record<string, any>; // JSON 配置（推荐：结构化或页面配置）
    cts?: number; // 创建时间
    uts?: number; // 更新时间
}
