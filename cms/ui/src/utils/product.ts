// interface ProductOptionType {
//     option: string;
//     values: string[];
// }
// type ProductOptionsType = ProductOptionType[];
// type SkuAttrType = Record<string, string>;

// [
//     { 颜色: '红', 大小: 'S', 材质: '棉' },
//     { 颜色: '红', 大小: 'S', 材质: '麻' },
//     { 颜色: '红', 大小: 'M', 材质: '棉' },
//     { 颜色: '红', 大小: 'M', 材质: '麻' },

//     { 颜色: '绿', 大小: 'S', 材质: '棉' },
//     { 颜色: '绿', 大小: 'S', 材质: '麻' },
//     { 颜色: '绿', 大小: 'M', 材质: '棉' },
//     { 颜色: '绿', 大小: 'M', 材质: '麻' },

//     { 颜色: '蓝', 大小: 'S', 材质: '棉' },
//     { 颜色: '蓝', 大小: 'S', 材质: '麻' },
//     { 颜色: '蓝', 大小: 'M', 材质: '棉' },
//     { 颜色: '蓝', 大小: 'M', 材质: '麻' },
// ];
// [
//     [{name:'颜色',value:'红'},{name:'大小',value:'S'},{name:'材质',value:'棉'}],
//     [{name:'颜色',value:'红'},{name:'大小',value:'S'},{name:'材质',value:'麻'}],
//     [{name:'颜色',value:'红'},{name:'大小',value:'M'},{name:'材质',value:'棉'}],
//     [{name:'颜色',value:'红'},{name:'大小',value:'M'},{name:'材质',value:'麻'}],
// ];

/**
 * 根据商品属性选项生成SKU列表
 * @param attrOptions 商品属性选项数组，每个元素包含属性名和对应的属性值数组
 * @returns 返回生成的SKU列表，每个SKU是一个包含各属性值的对象
 */
export function genProductSkuByOptions(attrOptions: ProductOptionsType) {
    let skuNum = attrOptions.reduce((a, b) => a * b.values.length, 1); //总sku数量是所有属性值的乘积
    let skuList = Array.from({ length: skuNum }, () => ({} as SkuAttrObjType)); //空sku列表用于填充

    let batchNum = skuNum;
    //遍历填充属性，先填充第一列，再填充第二列，以此类推//循环切换属性 颜色-》尺寸-》。。
    for (let i = 0; i < attrOptions.length; i++) {
        const { option: attrName, values } = attrOptions[i]; //取属性 和 属性值
        batchNum = batchNum / values.length; //同一个属性的值，重复填充次数计算，后面的属性重复数量减少

        let skuIdx = 0; //填充的sku数量记录
        //两层循环总数==sku数量
        for (let i = 0; i < skuNum / batchNum; i++) {
            //切换属性值
            let value = values[i % values.length];
            //同一个属性相同的值连续填充的次数
            for (let j = 0; j < batchNum; j++) {
                skuList[skuIdx][attrName] = value;
                skuIdx++;
            }
        }
    }
    return skuList;
}

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

export const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
