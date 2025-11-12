interface ProductOptionType {
    option: string;
    values: string[];
}
type ProductOptionsType = ProductOptionType[];
type SkuAttrObjType = Record<string, string>;
type SkuAttrArrayType = Record<string, SkuAttrObjType>;
interface SkuType {
    id: string;
    name: string;
    img: string;
    price: number;
    stock: number;
    attrs: SkuAttrObjType;
}
