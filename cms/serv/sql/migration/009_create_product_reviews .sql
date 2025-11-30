CREATE TABLE product_reviews (
    product_id  BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL DEFAULT 0,
    total SMALLINT NOT NULL DEFAULT 0,
    count SMALLINT NOT NULL DEFAULT 0,   -- 评论用户 ID（外键）
    avg SMALLINT NOT NULL DEFAULT 0, -- 评论用户头像（外键）
    status  SMALLINT NOT NULL DEFAULT 0,
	cts int8 DEFAULT (EXTRACT(epoch FROM now()) * 1000::numeric)::bigint NULL
);

