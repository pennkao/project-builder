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
