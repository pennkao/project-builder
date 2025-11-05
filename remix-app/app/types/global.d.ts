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

interface ProductType {
    id: string;
    name: string;
    image: string;
    price: number;
    score: number;
    monthly?: string;
    tags?: string[];
    options?: ProductOptionType[];
    skus?: SKUType[];
}

interface ProductOptionType {
    sort: number;
    label: string;
    values?: string[];
}

interface SKUType {
    id: string;
    url: string;
    price: number;
    stock: number;
    attributes: Record<string, string>; // e.g. { 尺码: "M", 颜色: "红" }
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
    city: AddressOptionType;
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
