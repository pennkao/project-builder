CREATE TABLE images (
    id              BIGSERIAL PRIMARY KEY,
    url             TEXT NOT NULL DEFAULT '',                        -- 可访问 URL
    storage_path    TEXT NOT NULL DEFAULT '',                        -- 存储路径（如 '/uploads/products/123.jpg'）
    file_name       TEXT NOT NULL DEFAULT '',                          -- 原始文件名
    file_type       TEXT NOT NULL DEFAULT '',               -- 图片用途（product/avatar/banner）
    mime_type       TEXT NOT NULL DEFAULT '',               -- MIME 类型（image/jpeg）
    alt_text        TEXT NOT NULL DEFAULT '',                      -- 描述/替代文字
    width_px        INT NOT NULL DEFAULT 0,
    height_px       INT NOT NULL DEFAULT 0,
    size            BIGINT NOT NULL DEFAULT 0,
    platform        SMALLINT NOT NULL DEFAULT 0,
	cts int8 DEFAULT (EXTRACT(epoch FROM now()) * 1000::numeric)::bigint NULL
);