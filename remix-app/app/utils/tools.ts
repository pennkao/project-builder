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

export function discount(num: number, price: number, other: number): { discount: number; total: number; num: number; payAmount: number; nextDiscount: number; nextDiscountNum: number } {
    let total = num * price - other;
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

    let payAmount = total - discount;
    return {
        total,
        payAmount,
        num: rules[i],
        discount,
        nextDiscount: (rulesMap[rules[i + 1]]?.discount || 0) * total,
        nextDiscountNum: rulesMap[rules[i + 1]]?.minNum || 0,
    };
}
