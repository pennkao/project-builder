export function buildObjectByOrderKeys<T extends Record<string, any>, K extends keyof T>(keys: K[], source: T): Pick<T, K> {
    return Object.fromEntries(keys.map((key) => [key, source[key]])) as Pick<T, K>;
}

export function buildJsonByOrderKeys<T extends Record<string, any>, K extends keyof T>(keys: K[], source: T): string {
    return JSON.stringify(buildObjectByOrderKeys(keys, source)); // TOD fix this
}

export function buildObbjectFromGroupAttributes<T extends Record<string, string>>(list: T[]): { [K in keyof T]: T[K][] } {
    if (list.length === 0) {
        return {} as { [K in keyof T]: T[K][] };
    }

    const result = {} as { [K in keyof T]: T[K][] };

    // 获取所有键（假设所有对象结构一致）
    const keys = Object.keys(list[0]) as (keyof T)[];

    for (const key of keys) {
        result[key] = list.map((item) => item[key]);
    }

    return result;
}

export function discount(num: number, price: number, payment: string, other: number): DiscountInfoType {
    let total = num * price;
    let discount = 0.0;
    const rules = [3, 5, 10, 15, 20];
    const rulesMap: Record<number, { discount: number; minNum?: number }> = {
        3: {
            discount: 0.05,
            minNum: 3,
        },
        5: {
            discount: 0.1,
            minNum: 5,
        },
        10: {
            discount: 0.15,
            minNum: 10,
        },
        15: {
            discount: 0.2,
            minNum: 15,
        },
        20: {
            discount: 0.25,
            minNum: 20,
        },
    };
    let i = rules.length - 1;
    for (; i >= 0; i--) {
        if (num >= rules[i]) {
            discount = total * rulesMap[rules[i]].discount;
            break;
        }
    }

    const paymentDiscount = payment === 'credit-card' ? total * 0.05 : 0;
    let payAmount = total - discount - paymentDiscount - other;
    return {
        total,
        payAmount,
        num: rules[i],
        discount,
        nextDiscount: (rulesMap[rules[i + 1]]?.discount || 0) * total,
        nextDiscountNum: rulesMap[rules[i + 1]]?.minNum || 0,
        paymentDiscount: paymentDiscount,
    };
}

export function checkoutPayment(total: number, paymentAmount: number, paymentMethod: PaymentMethod, shippingFee: number): CheckoutDiscountInfoType {
    const value = total * paymentMethod.fee;
    const paymenAmountNew = paymentMethod.key === 'credit-card' ? paymentAmount - value : paymentAmount + value;
    return {
        payAmount: paymenAmountNew + shippingFee,
        paymentDiscountOrFee: value,
        shippingFee: shippingFee,
    };
}

export function checkoutPaymentFormat(num: number, symbol: string, paymentFeeType: 'discount' | 'fee'): string {
    if (num === 0) {
        return '--';
    }
    if (paymentFeeType === 'discount') {
        return '-' + symbol + Math.abs(num).toFixed(2);
    }
    return '+' + symbol + num.toFixed(2);
}

export function discountMoneyFormat(num: number, symbol: string): string {
    if (num === 0) {
        return '--';
    }

    return '-' + symbol + num.toFixed(2);
}

export function moneyFormat(num: number): string {
    if (num === 0) {
        return '0.00';
    }
    return num.toFixed(2);
}

export async function hashString(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // 转成 hex
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const postalCodePatterns: Record<string, RegExp> = {
    // Europe
    GB: /^[A-Z0-9]{2,4} ?[0-9A-Z]{2}$/i, // UK: 宽松，保留空格可选
    FR: /^\d{2,5}$/, // France: 一般5位，但允许短写
    DE: /^\d{4,5}$/, // Germany: 5位数字
    IT: /^\d{4,5}$/, // Italy: 一般5位
    NL: /^\d{4}\s?[A-Z]{0,2}$/i, // Netherlands: 4位+可选字母
    PL: /^\d{2}-?\d{3}$/, // Poland: 00-000
    ES: /^\d{4,5}$/, // Spain: 5位
    RU: /^\d{5,6}$/, // Russia: 6位，允许5位兼容

    // Americas
    US: /^\d{5}(-\d{4})?$/, // USA: ZIP5 或 ZIP+4
    CA: /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i, // Canada: 放宽空格
    BR: /^\d{5}-?\d{3}$/, // Brazil: 00000-000
    MX: /^\d{4,5}$/, // Mexico: 5位
    // 可加拉丁美洲其他国家通用格式: /^\d{4,6}$/

    // Asia
    CN: /^\d{6}$/, // China: 固定6位
    JP: /^\d{3}-?\d{4}$/, // Japan: 123-4567
    KR: /^\d{5}$/, // Korea: 5位
    IN: /^\d{6}$/, // India: 6位 PIN
    ID: /^\d{5}$/, // Indonesia: 5位
    SA: /^\d{4,6}$/, // Saudi Arabia: 5位为主，但部分4~6位
    TR: /^\d{4,5}$/, // Turkey: 一般5位
    // 可兼容亚洲国家通用模式: /^\d{3,7}$/

    // Oceania
    AU: /^\d{4}$/, // Australia: 4位
    // New Zealand 可共用同规则: /^\d{4}$/
};
