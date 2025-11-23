import { nanoid } from 'nanoid';

// 例子： "V1StGXR8_Z5jdHi6B-myT"

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

export function makeSkuListByAttrs(attrOptions: AttrType[]) {
    let skuNum = attrOptions.reduce((a, b) => a * b.values.length, 1); // 总sku数量是所有属性值的乘积
    let skuList: SkuAttrItemType[][] = Array.from({ length: skuNum }, () => [] as SkuAttrItemType[]); // 结果存储每个 SKU 属性项

    let batchNum = skuNum;

    // 遍历填充属性，先填充第一列，再填充第二列，以此类推 // 循环切换属性 颜色 -> 尺寸 -> ..
    for (let i = 0; i < attrOptions.length; i++) {
        const { name: attrName, attr_id, values } = attrOptions[i]; // 获取属性名称、ID 和属性值
        batchNum = batchNum / values.length; // 同一个属性的值，重复填充次数计算，后面的属性重复数量减少

        let skuIdx = 0; //填充的sku数量记录

        // 两层循环总数 == sku数量
        for (let j = 0; j < skuNum / batchNum; j++) {
            // 切换属性值
            let value = values[j % values.length];
            const { value_id, value: valueName } = value; // 解构出属性值的字段

            // 填充 skuList
            for (let k = 0; k < batchNum; k++) {
                skuList[skuIdx][i] = {
                    name: attrName, // 属性名
                    value: valueName, // 属性值
                    attr_id: attr_id, // 属性 ID
                    value_id: value_id, // 选项 ID
                };
                skuIdx++;
                // 生成每个 SKU 对应的属性项
                // skuList.push();
            }
        }
    }

    return skuList;
}

export function genAttrId() {
    return nanoid();
}

// 将中文转换成英文 key，例如 "口味" → "kouwei"
// const toPinyinSlug = (str: string) =>
//     str
//         .normalize('NFD')
//         .replace(/[\u0300-\u036f]/g, '')
//         .replace(/\s+/g, '_')
//         .toLowerCase();

// export function makeProductAttrs(options: ProductOptionsType, skuList: SkuType[]) {
// const productAttrs = options.map((opt) => {
//     return {
//         attr_id: 'attr_' + nanoid(), // 新属性 ID
//         name: opt.option, // 可选转换，不喜欢可以换成 nanoid
//         label: opt.option, // 显示名
//         type: 'single', // 默认 single（你可以根据需要修改）
//         sort: opt.sort,
//         values: opt.values.map((v) => ({
//             value_id: 'val_' + nanoid(),
//             value: v,
//             label: v,
//         })),
//     };
// });

// skuList.map((sku) => {
//     console.log(sku.attrs);
//     let attrItems: SkuAttrItemType[] = [];
//     Object.keys(sku.attrs).forEach((key) => {
//         // console.log(key, sku.attrs[key]);
//         const attr = productAttrs.find((a) => a.name === key);
//         if (attr) {
//             const value = attr.values.find((v) => v.value === sku.attrs[key]);
//             console.log(attr.attr_id, value?.value_id, value?.value);
//             if (value) {
//                 attrItems.push({
//                     name: attr.name,
//                     attr_id: attr.attr_id,
//                     value_id: value.value_id,
//                     value: value.value,
//                 });
//             }
//         }
//     });

// sku.attrs = attrItems;
// console.log(attrItems);
// console.log('========================================');
// );
// }
