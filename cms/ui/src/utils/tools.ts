// 对象 → 数组
// const obj = { 颜色: '红', 大小: 'S', 材质: '棉' };
// const arr = Object.entries(obj).map(([name, value]) => ({ name, value }));

// 数组 → 对象
// const back = Object.fromEntries(arr.map(({ name, value }) => [name, value]));

export function obj2Array(obj: Record<string, string>) {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
}

export function array2Obj(arr: Record<string, string>[]) {
    return Object.fromEntries(arr.map(({ name, value }) => [name, value]));
}

// utils/isUrl.ts
export function isValidUrl(str: string): boolean {
    try {
        // 如果没有协议头，自动补全 https://（可选）
        const urlStr = str.trim();
        if (!urlStr) return false;
        new URL(urlStr);
        return true;
    } catch {
        return false;
    }
}

export const sortItems = <T>(items: T[], field: keyof T, status: 'asc' | 'desc') => {
    return [...items].sort((a, b) => {
        if (a[field] < b[field]) return status === 'asc' ? 1 : -1;
        if (a[field] > b[field]) return status === 'asc' ? -1 : 1;
        return 0;
    });
};


