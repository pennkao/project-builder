-- 支付记录表
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    payment_no VARCHAR(64) NOT NULL UNIQUE,          -- 支付流水号（如：PAY202511270001）
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, -- 关联订单
    user_id BIGINT NOT NULL DEFAULT 0,                         -- 用户 ID（冗余字段，便于查询）
    amount  TEXT NOT NULL DEFAULT '',                  -- 支付金额
    currency  TEXT NOT NULL DEFAULT '',         -- 货币代码（ISO 4217，如 CNY、USD）
    payment_method  TEXT NOT NULL DEFAULT '',              -- 支付方式（wechat, alipay, bank_card, paypal 等）
    payment_channel  TEXT NOT NULL DEFAULT '',                    -- 具体渠道（如：微信公众号、支付宝APP、Stripe）
    status SMALLINT NOT NULL DEFAULT 0,              -- 支付状态：
                                                     -- 0: 待支付（创建但未调起）
                                                     -- 1: 支付中（已调起，等待回调）
                                                     -- 2: 支付成功
                                                     -- -1: 支付失败
                                                     -- -2: 已关闭（超时未支付）
    trade_no  TEXT NOT NULL DEFAULT '',                         -- 第三方交易号（如微信 transaction_id、支付宝 trade_no）
    out_trade_no  TEXT NOT NULL DEFAULT '',                       -- 商户订单号（通常等于 order_no 或自定义）
    callback_time TIMESTAMPTZ,                       -- 第三方回调时间
    paid_at TIMESTAMPTZ,                             -- 实际支付成功时间
    remark TEXT,                                     -- 备注（如失败原因）
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);

