

//版本二返回其他格式
/**
 * 根据产品名称生成 Shopify 风格的 handle
 * @param name 产品名称
 * @returns handle 字符串
 */
export function genHandle(name: string, havNum: number = 0): string {
    let handle = name
        .trim() // 去掉前后空格
        .toLowerCase() // 全小写
        .normalize('NFD') // 去重音
        .replace(/[\u0300-\u036f]/g, '') // 去掉重音符号
        .replace(/[^\p{L}\p{N}\s-]/gu, '') // 保留字母、数字、空格、-，删除标点
        .replace(/\s+/g, '-') // 空格变 -
        .replace(/-+/g, '-') // 连续 - 合并
        .replace(/^-+|-+$/g, ''); // 去掉首尾 -

    if (havNum > 0) {
        handle = `${handle}-${havNum}`;
    }

    return handle;
}

/**
 * FNV-1a 64-bit
 */
export function fnv1a64(handle: string): bigint {
    let hash = 0xcbf29ce484222325n; // FNV offset basis 64-bit
    const prime = 0x100000001b3n; // FNV prime 64-bit

    for (let i = 0; i < handle.length; i++) {
        hash ^= BigInt(handle.charCodeAt(i));
        hash = (hash * prime) & 0xffffffffffffffffn; // 保持 64 位
    }
    return hash;
}

// FNV-1a 32-bit 整数哈希 (跨语言稳定)
export function fnv1a32(handle: string): number {
    let hash = 0x811c9dc5;
    const prime = 0x01000193;
    const encoder = new TextEncoder(); // ✅ 按 UTF-8 编码
    const bytes = encoder.encode(handle); // Uint8Array

    for (let i = 0; i < bytes.length; i++) {
        hash ^= bytes[i];
        hash = Math.imul(hash, prime); // ✅ 保持 32 位整数乘法
        hash >>>= 0; // ✅ 保持无符号
    }

    return hash >>> 0;
}

// 输入框显示用
export function formInput(value: number | '' | null | undefined): string {
    // 空值统一显示为空字符串
    if (value === null || value === undefined || value === '') {
        return '';
    }
    return value.toString();
}

export function keyDownNumberInput(e: React.KeyboardEvent<HTMLInputElement>) {
    // 空值统一显示为空字符串
    if (e.key === '.' || e.key === 'e' || e.key === '-' || e.key === '+') {
        e.preventDefault();
    }
}

// 输入值格式化提交用
export function formartValue(field: string, value: string): number | string | string[] {
    switch (field) {
        case 'price': {
              if (value === '' || value === '.' || value.endsWith('.')) {
        return value; // 保留字符串
    }
            if (value == '.') {
                return '0.';
            }
            value = value.trim();
            return formPrice(value);
        }
        case 'stock':
        case 'weight_g': {
            value = value.trim();
            if (value == '0.' || value == '0') {
                return '';
            }
            // 整数处理
            return value ? value.split('.')[0] : ''; // 保留数字
        }
        case 'tags':
            return formartTags(value);
        default:
            return value;
    }
}

export function formartTags(value: string): string[] {
    return value
        .trim()
        .replace(/[，。；：！,]/g, ',')
        .replace(',,', ',')
        .split(',')
        .map((tag) => tag.trim());
}

export function formPrice(value: string) {
    if (value == '0.' || value == '0' || value == '') {
        return value;
    }
    // 1. 移除非法字符（允许数字和 .）
    let v = value.replace(/[^\d.]/g, '');
    // 2. 限制小数点最多 1 个
    const parts = v.split('.');
    let intPart = parts[0];
    if (intPart.length > 1) {
        if (intPart.startsWith('0') && !intPart.startsWith('0.')) {
            intPart = String(Number(intPart));
        }
    }

    if (parts.length > 1) {
        v = intPart + '.' + parts[1].slice(0, 3);
    } else {
        v = intPart;
    }

    return v;
}


