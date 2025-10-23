// app/types.d.ts

// types.ts  不要写 export interface User，否则它就变成模块，必须手动导入。
interface Product {
    id: string;
    name: string;
    image: string;
    points: number;
    price: number;
    monthly: string;
    tags?: string[];
}

interface Country {
    code: string;
    name: string;
}

interface City {
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

type Focused = 'name' | 'number' | 'expiry' | 'cvc' | '';

interface CreditCardPaymentFormType {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
}
