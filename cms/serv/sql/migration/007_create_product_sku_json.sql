-- 创建 product_skus 表
CREATE TABLE product_sku_json(
    product_id    BIGINT PRIMARY KEY NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    skus          JSONB NOT NULL DEFAULT '[]'::JSONB, -- JSONB 类型，用于存储 SKU 数据
    cts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT 
);