-- 订单主表
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,                               -- 主键，自增 BIGINT
    order_no TEXT NOT NULL DEFAULT '',                      -- 订单编号（业务唯一标识，如：ORD202511270001）
    user_id TEXT NOT NULL DEFAULT '',                       -- 下单用户 ID（可关联 users 表）
    status SMALLINT NOT NULL DEFAULT 0,                     -- 订单状态（0: 待支付, 1: 已支付, 2: 已发货, 3: 已完成, -1: 已取消）
    pay_amount BIGINT NOT NULL DEFAULT 0,        -- 实际支付金额
    total_amount BIGINT NOT NULL DEFAULT 0,      -- 订单总金额（含运费、优惠等）
    discount_amount BIGINT NOT NULL DEFAULT 0,   -- 优惠金额
    freight_amount BIGINT NOT NULL DEFAULT 0,    -- 运费
    payment_method TEXT NOT NULL DEFAULT '',         -- 支付方式（如：wechat, alipay, credit_card）
    payment_time BIGINT NOT NULL DEFAULT 0,          -- 支付时间
    consignee TEXT NOT NULL DEFAULT '',              -- 收货人姓名
    phone TEXT NOT NULL DEFAULT '',                  -- 联系电话
    email TEXT NOT NULL DEFAULT '',                  -- email
    address TEXT NOT NULL DEFAULT '',                -- 收货地址（完整地址字符串）
    address1 TEXT NOT NULL DEFAULT '',               -- 收货地址1（完整地址字符串）
    state TEXT NOT NULL DEFAULT '',                  -- 省
    city TEXT NOT NULL DEFAULT '',                   -- 市
    country TEXT NOT NULL DEFAULT '',                -- 国家
    zip_code TEXT NOT NULL DEFAULT '',               -- 邮政编码
    remark TEXT NOT NULL DEFAULT '',                 -- 用户备注
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);

