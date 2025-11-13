CREATE TABLE product_meta (
    product_id     BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,          -- 存放 title / meta / schema 等结构化字段
    description TEXT NOT NULL DEFAULT ''   -- 摘要
);
