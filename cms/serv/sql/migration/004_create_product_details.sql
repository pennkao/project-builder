-- 创建 product_details 表
CREATE TABLE product_details (
    product_id     BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    -- 结构化内容（便于前端渲染或 SEO）
    images         TEXT[] DEFAULT '{}',                   -- 主图之外的详情图 URL 数组
    videos         JSONB DEFAULT '[]'::JSONB,             -- 视频列表 [{url, cover}]
    specs          JSONB DEFAULT '[]'::JSONB,             -- 参数表 [{"name":"屏幕","value":"6.1寸"}]
    cts            BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts            BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT 
);