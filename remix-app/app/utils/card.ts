import cardValidator from 'card-validator';

export const formatExpireDateInput = (input: string) => {
    // 去掉非数字
    let v = input.replace(/\D/g, '');
    if (!v) return '';

    // 限制最多 4 位数字（MMYY）
    if (v.length > 4) v = v.slice(0, 4);

    // --- 核心逻辑 ---
    if (v.length === 2) {
        const num = parseInt(v, 10);
        if (num > 12) {
            // 补0并插入 /
            v = `0${v.slice(0, 1)}/${v.slice(1, 2)}`;
        } else {
            // 等待输入更多，不立即插入
        }
    } else if (v.length === 3) {
        const month = parseInt(v.slice(0, 2), 10);
        if (month >= 1 && month <= 12) {
            v = `${v.slice(0, 2)}/${v.slice(2)}`;
        }
    } else if (v.length > 3) {
        // 已超过 3 位，强制格式化为 MM/YY
        v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }

    return v;
};

export function checkExpiredDate(expiredAt: string): ErrorType {
    let result: ErrorType = {
        result: false,
        message: '',
    };
    expiredAt = expiredAt.trim().replace('/', '');
    if (expiredAt === '') {
        result.message = '请输入有效日期';
        return result;
    }
    if (expiredAt.length !== 4) {
        result.message = '请输入4位有效日期';
        return result;
    }
    if (parseInt(expiredAt.slice(0, 2)) > 12) {
        result.message = '请输入正确的到期月';
        return result;
    }
    console.log(new Date().getFullYear());
    if (parseInt(expiredAt.slice(2, 4)) < new Date().getFullYear() % 100) {
        // result.message = '请输入正确的到期年';
        // return result;
    }
    const expValidation = cardValidator.expirationDate(expiredAt);
    console.log(expiredAt, expValidation);
    if (!expValidation.isValid) {
        result.message = '请输入正确的到期日期';
        return result;
    }
    result.result = true;
    return result;
}

export function checkNumber(number: string): ErrorType {
    const numberValidation = cardValidator.number(number);
    if (!numberValidation.isValid) {
        return {
            result: false,
            message: '请输入正确的卡号',
        };
    }
    return {
        result: true,
        message: '',
    };
}

const forbiddenWords = ['TEST', 'ABC', 'DEF', 'XXX', 'INVALID', 'CARDHOLDER'];

export function checkName(name: string): ErrorType {
    const trimmed = name.trim();
    let errorMessage: ErrorType = {
        result: false,
        message: '请输入有效姓名',
    };
    // 长度检查
    if (trimmed.length < 2 || trimmed.length > 35) {
        return errorMessage;
    }

    // 只允许字母、空格、'、-
    if (!/^[A-Za-z\s'-]+$/.test(trimmed)) {
        return errorMessage;
    }

    // 禁止连续相同字符超过 3 个
    if (/(.)\1{2,}/.test(trimmed)) {
        return errorMessage;
    }

    // 禁止数字
    if (/\d/.test(trimmed)) {
        return errorMessage;
    }
    // 黑名单检查
    for (const word of forbiddenWords) {
        if (trimmed.includes(word)) return errorMessage;
    }

    // 至少两个单词
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return errorMessage;
    return {
        result: true,
        message: '',
    };
}

export function checkCvv(cvv: string): ErrorType {
    if (cvv.trim() === '') {
        return {
            result: false,
            message: '请输入卡号CVC',
        };
    }
    if (cvv.length < 3 || cvv.length > 4) {
        return {
            result: false,
            message: '请输入正确的卡号CVC',
        };
    }
    const numberValidation = cardValidator.cvv(cvv);
    if (!numberValidation.isValid) {
        return {
            result: false,
            message: '请输入正确的卡号CVC',
        };
    }
    return {
        result: true,
        message: '',
    };
}

export function formatCardNumber(input: string): string {
    // 去掉所有非数字字符
    let digits = input.replace(/\D/g, '');

    // 检测卡类型（BIN 前缀判断）
    const getCardType = (num: string) => {
        if (/^4/.test(num)) return 'visa';
        if (/^5[1-5]/.test(num) || /^2(2[2-9]|[3-7])/.test(num)) return 'mastercard';
        if (/^3[47]/.test(num)) return 'amex';
        if (/^6(?:011|5|4[4-9])/.test(num)) return 'discover';
        if (/^35(2[89]|[3-8][0-9])/.test(num)) return 'jcb';
        if (/^3(?:0[0-5]|[68])/.test(num)) return 'diners';
        if (/^62/.test(num)) return 'unionpay';
        if (/^(50|56|57|58|6[0-9])/.test(num)) return 'maestro';
        if (/^(4011|4389|4514|4576|5041|5067|5090|5099|6504|6516|6550)/.test(num)) return 'elo';
        if (/^220[0-4]/.test(num)) return 'mir';
        if (/^6062/.test(num)) return 'hipercard';
        if (/^9792/.test(num)) return 'troy';
        return 'unknown';
    };

    const type = getCardType(digits);

    // 各类型最大长度
    const maxLengthByType: Record<string, number> = {
        amex: 15,
        diners: 14,
        visa: 19,
        mastercard: 16,
        discover: 16,
        jcb: 16,
        unknown: 19,
    };

    // 截断到该类型最大长度
    digits = digits.slice(0, maxLengthByType[type]);

    // 获取分组规则
    const getGroups = (type: string, length: number) => {
        switch (type) {
            case 'amex':
                return [4, 6, 5];
            case 'diners':
                return [4, 6, 4];
            default:
                // 未知类型动态按每4位一组
                const groups = [];
                for (let i = 0; i < length; i += 4) {
                    groups.push(Math.min(4, length - i));
                }
                return groups;
        }
    };

    const groups = getGroups(type, digits.length);

    // 分组拼接
    const result: string[] = [];
    let idx = 0;
    for (const g of groups) {
        if (digits.length > idx) {
            result.push(digits.substr(idx, g));
            idx += g;
        }
    }

    return result.join(' ');
}
