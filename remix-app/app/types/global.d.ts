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
    image: string;
    total: number;
    discountValue: number;
    payAmount: number;
}

interface UserInfoType {
    addressSelected: AddressSelectedType;
    email: string; // 邮箱
    firstName: string; // 名
    lastName: string; // 姓
    company: string; // 公司
    address: string; // 地址
    address2: string; // 地址2
    zipCode: string; // 邮编
    phone: string; // 电话
    country: string;
    state: string;
    city: string;
}
