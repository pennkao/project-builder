-- 支付记录表
CREATE TABLE sites (
    id      BIGINT NOT NULL PRIMARY KEY,                -- 站点ID
    name     TEXT NOT NULL DEFAULT '',                  -- 站点名称
    domain   TEXT NOT NULL DEFAULT '',                  -- 站点域名
    status   smallint NOT NULL DEFAULT 0,               -- 站点状态（1: 活跃, 0: 非活跃）
    stype    TEXT NOT NULL DEFAULT '',                  -- 站点类型（如：blog, shop, forum 等）
    site     JSONB NOT NULL DEFAULT '{}'::JSONB,        -- 站点配置
    config   JSONB NOT NULL DEFAULT '{}'::JSONB,        -- 站点配置
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);

