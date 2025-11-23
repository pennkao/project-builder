// app/types.d.ts

// types.ts  不要写 export interface User，否则它就变成模块，必须手动导入。

interface CountryType {
    code: string;
    name: string;
}

interface CityType {
    name: string;
    code: string;
}

interface StateType {
    code: string;
    name: string;
}

interface AddressOptionType {
    code: string;
    name: string;
}

interface AddressSelectedType {
    country: string;
    state: string;
    city: string;
}

type Focused = 'name' | 'number' | 'expiry' | 'cvc' | '';

interface CreditCardPaymentFormType {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
}

interface ProductItemType {
    name: string;
    handle: string;
    main_image: string;
    tags: string[];
    price: number;
    sales_count: number;
    stock: number;
}

interface DiscountInfoType {
    discount: number;
    total: number;
    num: number;
    payAmount: number;
    nextDiscount: number;
    nextDiscountNum: number;
    paymentDiscount: number;
}
interface CheckoutDiscountInfoType {
    payAmount: number;
    paymentDiscountOrFee: number;
    shippingFee: number;
}
interface ErrorType {
    result: boolean;
    message: string;
}

interface CardErrorType {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
}

interface ReviewType {
    id: string;
    avatar: string;
    images: string[];
    username: string;
    comment: string;
}

interface ProductSelectedType {
    productId: string;
    sku: SKUType;
    quantity: number;
    name: string;
    price: number;
    firstOrder: number; // 首单优惠
    image: string;
    total: number;
    discountValue: number;
    payAmount: number;
}

interface UserInfoFormType {
    email: string; // 邮箱
    firstName: string; // 名
    lastName: string; // 姓
    company: string; // 公司
    address: string; // 地址
    address2: string; // 地址2
    zipCode: string; // 邮编
    phone: string; // 电话
    country: AddressOptionType;
    state: AddressOptionType;
    city: string;
}

// 定义类型
type ShippingMethod = {
    name: string;
    fee: number; // 按 0.1kg 价格
    currency: string;
    delivery_days: string; // 例如 "3-5"
};

type PaymentMethod = {
    key: string;
    name: string;
    fee: number; // 按 0.1kg 价格
};

type ShippingOptions = Record<string, ShippingMethod[]>;

interface OrderInfoType {
    OrderId: string;
    orderTime: string; // 订单时间
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    product: ProductSelectedType;
    firstOrderDiscount: number; // 首单优惠
    total: number;
    paymentFeeType: 'discount' | 'fee';
    discount: number;
    paymentDiscountOrFee: number;
    payAmount: number;
    shippingFee: number; // 配送费
    fingerprint: string;
    creditCard: CreditCardPaymentFormType;
    useInfo: UseInfoType; // 使用优惠信息
}

type MessageBoxType = 'success' | 'error' | 'info' | 'warning';

interface CrypoType {
    id: string;
    name: string;
    network: string;
    symbol: string;
    baseId: string;
    address: string;
    confirmTime: number; // 确认时间
}

interface ProductType {
    main: ProductMainType;
    skus: SkuType[];
    options: AttrType[];
    videos: string[];
    images: string[];
    specs: Record<string, string>;
}

interface ProductMainType {
    handle: string;
    id: number;
    main_image: string;
    name: string;
    price: number;
    sales_count: number;
    stock: number;
    tags: string[];
}

interface ProductReview {
    product_id: bigint; // 对应 products 表的 id
    user_name: string; // 评论用户 ID
    user_avatar: string; // 评论用户头像
    title: string; // 评论标题，可选
    content: string; // 评论正文
    rating: number; // 评分，0-5 或者 0-10，取决于业务
    images: string[]; // 评论图片 URL 数组
    sort: number; // 排序字段
}
