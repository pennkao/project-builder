CREATE TABLE images (
    id              SERIAL PRIMARY KEY,
    url             TEXT DEFAULT '',                        -- 可访问 URL
    storage_path    TEXT DEFAULT '',                        -- 存储路径（如 '/uploads/products/123.jpg'）
    file_name       TEXT NOT NULL,                          -- 原始文件名
    file_type       TEXT NOT NULL DEFAULT '',               -- 图片用途（product/avatar/banner）
    mime_type       TEXT NOT NULL DEFAULT '',               -- MIME 类型（image/jpeg）
    alt_text        TEXT DEFAULT NULL,                      -- 描述/替代文字
    width_px        INT DEFAULT 0,
    height_px       INT DEFAULT 0,
	cts int8 DEFAULT (EXTRACT(epoch FROM now()) * 1000::numeric)::bigint NULL
);