/** 属性选项（用在 SKU 组合） */
interface AttrValueType {
    value_id: string; // 选项 ID（数据库用）
    value: string; // 实际值，例如 '牛肉'
    sort: number; // 排序
    label: string; // 显示名，可修改
    content: string; // 显示名（可修改）
}
type AttrDisplayType = 'text' | 'image' | 'color' | 'icon' | 'tag' | 'text_with_desc' | 'input' | 'custom';
/** 产品属性定义（商品有哪些属性） */
interface AttrType {
    attr_id: string; // 属性 ID
    name: string; // 内部固定标识（英文）
    label: string; // 显示名，可修改
    display: AttrDisplayType; // 指定value的显示方式
    sort: number; // 排序
    values: AttrValueType[]; // 单选/多选可有选项
};
/** SKU 属性引用结构 */
interface SkuAttrItemType {
    name: string; // 属性名，如 size
    value: string; // 属性值，如 '500g'
    attr_id: string; // 属性 ID，如 size
    value_id: string; // 选项 ID，如 201
};
type ProductAttrType = AttrType[];
type SkuAttrType = SkuAttrItemType[];
