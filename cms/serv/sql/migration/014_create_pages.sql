CREATE TABLE pages (
    id              BIGINT PRIMARY KEY,
    title           TEXT NOT NULL,
    handle          TEXT NOT NULL UNIQUE,                           -- URL slug, e.g., 'iphone-15'
    subtitle        TEXT NOT NULL DEFAULT '',   
    sid            BIGINT NOT NULL DEFAULT 0,                      -- 站点 ID
    description    TEXT NOT NULL DEFAULT '',            -- 站点描述
    stype          TEXT NOT NULL DEFAULT '',                  -- 站点类型（如：blog, shop, forum 等）
    content        TEXT NOT NULL DEFAULT '',                
    image          TEXT NOT NULL DEFAULT '',
    status         SMALLINT NOT NULL DEFAULT 0,     -- 0=draft 1=published
    visibility     SMALLINT NOT NULL DEFAULT 0,  -- 0=public 1=private 2=unlisted   

    seo            JSONB NOT NULL DEFAULT '{}'::JSONB, 
    meta           JSONB NOT NULL DEFAULT '{}'::JSONB, 
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);
