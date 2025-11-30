CREATE TABLE product_customer_reviews (
    id          BIGSERIAL PRIMARY KEY, -- 评论 ID
    product_id    BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL DEFAULT '',   -- 评论用户 ID（外键）
    user_avatar TEXT NOT NULL DEFAULT '', -- 评论用户头像（外键）
    title TEXT NOT NULL DEFAULT '',       -- 可选标题（如“非常好用！”）
    content TEXT NOT NULL DEFAULT '',     -- 评论正文
    rating SMALLINT NOT NULL DEFAULT 0,
    images TEXT[] NOT NULL DEFAULT '{}',  -- 评论图片 URL 数组
    sort  SMALLINT NOT NULL DEFAULT 0,
    status  SMALLINT NOT NULL DEFAULT 0,
	cts int8 DEFAULT (EXTRACT(epoch FROM now()) * 1000::numeric)::bigint NULL
);

