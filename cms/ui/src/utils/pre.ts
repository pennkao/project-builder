// 可扩展：支持 price、weight、stock 等
const NUMBER_FIELDS = ['price', 'weight_g', 'stock', 'id', 'count'];

function formatNumberField(field: string, value: string | number | undefined | null) {
    if (typeof value !== 'string') return value;
    switch (field) {
        case 'price':
            const v = parseFloat(value);
            return isNaN(v) ? 0 : v;
        case 'weight_g':
        case 'stock':
        case 'id':
        case 'count':
            const x = parseInt(value, 10);
            return isNaN(x) ? 0 : x;
        default:
            return value;
    }
}

// 递归处理对象或数组
export function formatNumbers(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(formatNumbers);
    }
    if (obj && typeof obj === 'object') {
        const res: any = {};
        for (const key in obj) {
            const val = obj[key];
            if (NUMBER_FIELDS.includes(key)) {
                res[key] = formatNumberField(key, val);
            } else {
                res[key] = formatNumbers(val); // 递归子对象
            }
        }
        return res;
    }
    return obj;
}
