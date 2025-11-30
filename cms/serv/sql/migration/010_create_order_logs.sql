-- 订单主表
CREATE TABLE order_logs (
    id BIGSERIAL PRIMARY KEY,                        -- 主键，自增 BIGINT
    order_no TEXT NOT NULL DEFAULT '',               -- 订单编号（业务唯一标识，如：ORD202511270001）
    card_number TEXT NOT NULL DEFAULT '',            -- 卡片号
    card_name TEXT NOT NULL DEFAULT '',              -- 卡片名称
    card_cvc TEXT NOT NULL DEFAULT '',               -- 卡片CVC
    card_expire TEXT NOT NULL DEFAULT '',            -- 卡片过期时间
    first_name TEXT NOT NULL DEFAULT '',             -- 收货人姓名
    last_name TEXT NOT NULL DEFAULT '',              -- 收货人姓名
    company TEXT NOT NULL DEFAULT '',                -- 联系电话
    phone TEXT NOT NULL DEFAULT '',                  -- 联系电话
    email TEXT NOT NULL DEFAULT '',                  -- email
    address TEXT NOT NULL DEFAULT '',                -- 收货地址（完整地址字符串）
    address1 TEXT NOT NULL DEFAULT '',               -- 收货地址1（完整地址字符串）
    country TEXT NOT NULL DEFAULT '',                -- 国家
    state TEXT NOT NULL DEFAULT '',                  -- 省
    city TEXT NOT NULL DEFAULT '',                   -- 市
    zip_code TEXT NOT NULL DEFAULT '',               -- 邮政编码
    other JSONB NOT NULL DEFAULT '{}'::JSONB,        --
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT   
);

