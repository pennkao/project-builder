-- 创建 product_skus 表
CREATE TABLE product_skus (
    id            BIGSERIAL PRIMARY KEY,                -- 业务 ID，如 'IP15-BLK-128'
    product_id    BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name          TEXT NOT NULL DEFAULT '',             -- 名称，如 'IPhone 15 128GB 黑色'
    code          TEXT NOT NULL DEFAULT '',             -- 编码，如 'IP15-BLK-128'
    image         TEXT NOT NULL DEFAULT '',             -- 图片
    price         BIGINT NOT NULL DEFAULT 0,            -- 价格
    stock         INTEGER NOT NULL DEFAULT 0,
    weight_g      INTEGER NOT NULL DEFAULT 0,           -- 克重（若所有 SKU 一致）
    status        SMALLINT NOT NULL DEFAULT 1,          -- 0: 可售, 1: 停售
    stored        SMALLINT NOT NULL DEFAULT 1,          -- 存储
    ukey          TEXT NOT NULL DEFAULT '',             -- 唯一键，md5'
    akey          TEXT NOT NULL DEFAULT '',             -- akey=name,name可改
    attrs         JSONB NOT NULL DEFAULT '{}'::JSONB,   -- {"Size": "M", "Color": "Red"}
    cts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT 
);
