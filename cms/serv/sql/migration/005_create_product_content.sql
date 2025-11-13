-- 创建 product_content 表
CREATE TABLE product_content(
    product_id     BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    content        TEXT NOT NULL DEFAULT ''                
);