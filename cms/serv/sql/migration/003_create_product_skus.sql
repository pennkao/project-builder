-- 创建 product_skus 表
CREATE TABLE product_skus (
    id            BIGSERIAL PRIMARY KEY,                -- 业务 ID，如 'IP15-BLK-128'
    product_id    BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name          TEXT NOT NULL DEFAULT '',             -- 名称，如 'IPhone 15 128GB 黑色'
    img           TEXT NOT NULL DEFAULT '',                      -- 图片
    price         NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    stock         INTEGER NOT NULL DEFAULT 0,
    weight_g      INTEGER NOT NULL DEFAULT 0,                    -- 克重（若所有 SKU 一致）
    attrs         JSONB NOT NULL DEFAULT '{}'::JSONB,   -- {"Size": "M", "Color": "Red"}
    status        SMALLINT NOT NULL DEFAULT 1,                   -- 0: 可售, 1: 停售
    cts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT 
);
