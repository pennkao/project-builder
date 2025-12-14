interface ProductOptionType {
    sort: number;
    option: string;
    values: string[];
}
type ProductOptionsType = ProductOptionType[];
type SkuAttrObjType = Record<string, string>;
type SkuAttrArrayType = Record<string, SkuAttrObjType>;
interface SkuType {
    id: number;
    product_id: number;
    title: string;
    akey: string;
    ukey: string;
    image: string;
    weight_g: number; // int4 → number，单位：克
    price: number;
    stored: number; //
    stock: number;
    status: number; // int2 → number，通常表示枚举（如 0: 下架, 1: 上架）
    attrs: SkuAttrItemType[];
}

interface ProductMainType {
    id: number; // bigserial → number (或 bigint，见下方说明)
    title: string; // text NOT NULL
    subtitle: string; // text，默认 ''
    description: string; // text，默认 ''
    handle: string; // text NOT NULL, 唯一
    tags: string[]; // _text (text array)，默认 []
    status: number; // int2 → number，通常表示枚举（如 0: 下架, 1: 上架）
    deleted: number; // int2 → number，软删除标志（0: 未删, 1: 已删）
    weight_g: number; // int4 → number，单位：克
    brand: string; // text，默认 ''
    category: string; // text，默认 ''
    main_image: string; // text，默认 ''
    sales_count: number; // int4 → number
    stock: number; // int4 → number
    sku_num: number; // int4 → number
    price: number; // numeric(12,2) → number（注意精度问题，见说明）
    points: number; // int4 → number
}
type ProductContentType = string;

interface ProductType {
    main: ProductMainType;
    options: ProductAttrType;
    images: string[];
    skus: SkuType[];
    content: ProductContentType;
}

interface ProductDetailsType {
    images: string[];
    videos: string[];
    specs: Record<string, string>[];
}

interface ProductItemType {
    id: number;
    sid: number;
    handle: string;
    title: string;
    category: string;
    brand: string;
    price: string;
    sales_count: string;
    points: string;
    status: number;
    cts: string;
    main_image: string;
}

interface ProductReviewType {
    id: number;
    title: string;
    handle: string;
    main_image: string;
    rating: number;
    total: number;
    count: number;
    avg: number;
    status: number;
    cts: number;
}
