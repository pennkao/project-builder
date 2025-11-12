// 对象 → 数组
const obj = { 颜色: '红', 大小: 'S', 材质: '棉' };
const arr = Object.entries(obj).map(([name, value]) => ({ name, value }));

// 数组 → 对象
const back = Object.fromEntries(arr.map(({ name, value }) => [name, value]));

export function obj2Array(obj: Record<string, string>) {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
}

export function array2Obj(arr: Record<string, string>[]) {
    return Object.fromEntries(arr.map(({ name, value }) => [name, value]));
}
