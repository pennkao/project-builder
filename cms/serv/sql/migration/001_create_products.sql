-- 创建 products 表
CREATE TABLE products (
    id              BIGINT PRIMARY KEY,
    name            TEXT NOT NULL,
    handle          TEXT NOT NULL UNIQUE,                 -- URL slug, e.g., 'iphone-15'
    tags            TEXT[] NOT NULL DEFAULT '{}',                  -- e.g., ARRAY['手机', '新品']
    status          SMALLINT NOT NULL DEFAULT 0,                   -- 1: 上架, 0: 下架
    deleted         SMALLINT  NOT NULL DEFAULT 0,                   -- 软删除
    sku_num         SMALLINT  NOT NULL DEFAULT 0,                   -- SKU 数量（若所有 SKU 一致）
    weight_g        INTEGER  NOT NULL DEFAULT 0,                    -- 克重（若所有 SKU 一致）
    brand           TEXT  NOT NULL DEFAULT '',
    category        TEXT  NOT NULL DEFAULT '',                      -- 分类标识（如 'phones'）
    main_image      TEXT  NOT NULL DEFAULT '',                      -- 主图 URL
    sales_count     INTEGER  NOT NULL DEFAULT 0,                    -- 销量（可定期聚合）
    points          INTEGER  NOT NULL DEFAULT 0,                    -- 积分（可定期聚合）
    stock           INTEGER  NOT NULL DEFAULT 0,                    -- 销量库存（可定期聚合）
    price           BIGINT NOT NULL DEFAULT 0,                      -- 分
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);