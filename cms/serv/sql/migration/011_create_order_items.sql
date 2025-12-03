-- 订单明细表
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, -- 关联订单
    product_id BIGINT NOT NULL DEFAULT 0,                             -- 商品 ID（可关联 products 表）
    product_name TEXT NOT NULL DEFAULT '',                            -- 商品名称（冗余存储，防止商品信息变更影响历史订单）
    sku_id BIGINT NOT NULL DEFAULT 0,                                 -- SKU ID（若支持多规格）
    sku_name          TEXT NOT NULL DEFAULT '',                       -- 名称，如 'IPhone 15 128GB 黑色'
    sku_akey          TEXT NOT NULL DEFAULT '',                       -- 名称，如 'IPhone 15 128GB 黑色'
    sku_attrs         JSONB NOT NULL DEFAULT '{}'::JSONB,             -- {"Size": "M", "Color": "Red"}
    sku_image         TEXT NOT NULL DEFAULT '',                       -- 图片
    sku_desc TEXT NOT NULL DEFAULT '',                                -- SKU 描述（如颜色、尺寸等）
    quantity SMALLINT NOT NULL DEFAULT 0,                             -- 数量
    price BIGINT NOT NULL DEFAULT 0,                    -- 单价（下单时快照）
    total_amount BIGINT NOT NULL DEFAULT 0,             -- 小计 = quantity * price
    pay_amount BIGINT NOT NULL DEFAULT 0,                 -- 小计 = quantity * price
    status SMALLINT NOT NULL DEFAULT 0,                               -- 状态（0: 待支付, 1: 已支付, 2: 已取消, 3: 已退款）
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);
