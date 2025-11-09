-- 创建 product_options 表
CREATE TABLE product_options (
    product_id    BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    options       JSONB NOT NULL DEFAULT '[]'::JSONB,
    cts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT  
);