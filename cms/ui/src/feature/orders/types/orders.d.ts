// types/order-log.ts

interface OrderLogsType {
    id: number; // BIGSERIAL → number (或 bigint，见下文说明)
    order_no: string; // TEXT
    payment_method: string;
    card_number: string; // ⚠️ 敏感字段
    card_name: string;
    card_cvc: string; // ⚠️ 高危！绝不应在前端或日志中明文出现
    card_expiry: string;
    consignee: string;
    phone: string;
    email: string;
    address: string;
    address1: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    other: Record<string, any>; // JSONB → 通用对象
    cts: number; // BIGINT（毫秒时间戳）
    uts: number; // BIGINT
}
