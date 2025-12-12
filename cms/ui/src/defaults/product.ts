export const defaultProductMain: ProductMainType = {
    id: 0, // bigserial → number (或 bigint，见下方说明)
    title: '', // text NOT NULL
    handle: '', // text NOT NULL, 唯一
    tags: [], // _text (text array)，默认 []
    status: 0, // int2 → number，通常表示枚举（如 0: 下架, 1: 上架）
    deleted: 0, // int2 → number，软删除标志（0: 未删, 1: 已删），默认 0
    weight_g: 0, // int4 → number，单位：克
    brand: '', // text，默认 ''
    sku_num: 0, // int2 → number，默认 0
    category: '', // text，默认 ''
    subtitle: '', // text，默认 ''
    description: '', // text，默认 ''
    main_image: '', // text，默认 ''
    sales_count: 0, // int4 → number，默认 0
    stock: 0, // int4 → number，默认 0
    price: 0, // numeric(12,2) → number（注意精度问题，见说明）
    points: 0, // int4 → number，默认 0
};

export const defaultSku: SkuType = {
    id: 0,
    product_id: 0,
    title: '',
    image: '',
    akey: '',
    ukey: '',
    stored: 0,
    price: 0,
    weight_g: 0, // int4 → number，单位：克
    stock: 0,
    status: 0, // int2 → number，通常表示枚举（如 0: 下架, 1: 上架）
    attrs: [] as SkuAttrItemType[],
};
