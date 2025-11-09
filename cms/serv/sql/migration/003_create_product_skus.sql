-- 创建 product_skus 表
CREATE TABLE product_skus (
    id            TEXT PRIMARY KEY,                     -- 业务 ID，如 'IP15-BLK-128'
    product_id    BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    img           TEXT DEFAULT '',                      -- 图片
    price         NUMERIC(12,2) NOT NULL,
    stock         INTEGER NOT NULL DEFAULT 0,
    weight_g      INTEGER DEFAULT 0,                    -- 克重（若所有 SKU 一致）
    attrs         JSONB NOT NULL DEFAULT '{}'::JSONB,   -- {"Size": "M", "Color": "Red"}
    status        SMALLINT DEFAULT 1,                   -- 1: 可售, 0: 停售
    cts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT 
);