
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    filename      TEXT NOT NULL,                                -- 原始文件名（如 "mouse-front.jpg"）
    itype         TEXT NOT NULL DEFAULT '',                     -- 图片类型（如 "product"）
    mime_type     TEXT NOT NULL DEFAULT '',
    alt_text      TEXT DEFAULT '',                              -- 可选：用于搜索或展示
    width         INTEGER DEFAULT 0,                            -- 可选：图片宽高（便于前端布局）
    height        INTEGER DEFAULT 0,
    cts           BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
);