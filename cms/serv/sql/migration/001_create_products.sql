-- 创建 products 表
CREATE TABLE products (
    id              BIGSERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    handle          TEXT NOT NULL UNIQUE,                 -- URL slug, e.g., 'iphone-15'
    tags            TEXT[] DEFAULT '{}',                  -- e.g., ARRAY['手机', '新品']
    status          SMALLINT DEFAULT 1,                   -- 1: 上架, 0: 下架
    deleted         SMALLINT DEFAULT 0,                   -- 软删除
    weight_g        INTEGER DEFAULT 0,                    -- 克重（若所有 SKU 一致）
    brand           TEXT DEFAULT '',
    category        TEXT DEFAULT '',                      -- 分类标识（如 'phones'）
    main_image_url  TEXT DEFAULT '',                      -- 主图 URL
    sales_count     INTEGER DEFAULT 0,                    -- 销量（可定期聚合）
    price           NUMERIC(12,2) DEFAULT 0.00,           -- 起售价 / 最低价（用于列表展示）
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);