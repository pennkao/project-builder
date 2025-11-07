// src/data/shipping.ts

export type ShippingMethod = {
    name: string;
    fee: number; // 按 0.1kg 价格
    currency: 'USD' | 'CNY' | 'EUR';
    delivery_days: string;
};

export type CountryCode = 'GB' | 'JP' | 'US' | 'FR' | 'CA' | 'AU' | 'DE' | 'SA' | 'BR' | 'CN' | 'IN' | 'ID' | 'IT' | 'MX' | 'NL' | 'PL' | 'RU' | 'KR' | 'ES' | 'TR';

// src/data/shipping.ts

export const shippingOptions = new Map<CountryCode, ShippingMethod[]>([
    [
        'GB',
        [
            { name: 'Royal Mail', fee: 2.2, currency: 'USD', delivery_days: '5-10' },
            { name: 'Parcel Force', fee: 2.5, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', fee: 3.5, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.6, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', fee: 3.4, currency: 'USD', delivery_days: '3-6' },
            { name: 'EMS', fee: 2.8, currency: 'USD', delivery_days: '6-10' },
        ],
    ],
    [
        'JP',
        [
            { name: '日本郵便', fee: 2.0, currency: 'USD', delivery_days: '5-10' },
            { name: 'EMS', fee: 2.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'DHL', fee: 3.4, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', fee: 3.3, currency: 'USD', delivery_days: '3-5' },
            { name: 'ヤマト運輸', fee: 2.5, currency: 'USD', delivery_days: '5-8' },
            { name: '佐川急便', fee: 2.4, currency: 'USD', delivery_days: '5-8' },
        ],
    ],
    [
        'US',
        [
            { name: 'USPS', fee: 2.4, currency: 'USD', delivery_days: '5-10' },
            { name: 'UPS', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.3, currency: 'USD', delivery_days: '3-5' },
            { name: 'DHL', fee: 3.4, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'FR',
        [
            { name: 'La Poste', fee: 2.3, currency: 'USD', delivery_days: '6-10' },
            { name: 'Colissimo', fee: 2.5, currency: 'USD', delivery_days: '5-9' },
            { name: 'Chronopost', fee: 2.8, currency: 'USD', delivery_days: '4-7' },
            { name: 'DHL', fee: 3.5, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', fee: 3.4, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', fee: 3.3, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'CA',
        [
            { name: 'Canada Post', fee: 2.3, currency: 'USD', delivery_days: '5-10' },
            { name: 'Purolator', fee: 2.7, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', fee: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-5' },
            { name: 'DHL', fee: 3.3, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'AU',
        [
            { name: 'Australia Post', fee: 2.4, currency: 'USD', delivery_days: '5-10' },
            { name: 'DHL', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', fee: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'TNT', fee: 2.9, currency: 'USD', delivery_days: '4-7' },
        ],
    ],
    [
        'DE',
        [
            { name: 'Deutsche Post', fee: 2.2, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', fee: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'Hermes', fee: 2.7, currency: 'USD', delivery_days: '4-7' },
            { name: 'UPS', fee: 3.1, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'SA',
        [
            { name: 'البريد السعودي', fee: 2.6, currency: 'USD', delivery_days: '6-10' }, // Saudi Post
            { name: 'أرامكس', fee: 2.9, currency: 'USD', delivery_days: '5-9' }, // Aramex
            { name: 'DHL', fee: 3.5, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', fee: 3.4, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'BR',
        [
            { name: 'Correios', fee: 2.7, currency: 'USD', delivery_days: '8-15' },
            { name: 'DHL', fee: 3.8, currency: 'USD', delivery_days: '4-8' },
            { name: 'FedEx', fee: 3.7, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', fee: 3.6, currency: 'USD', delivery_days: '4-8' },
        ],
    ],
    [
        'CN',
        [
            { name: '中国邮政', fee: 1.8, currency: 'USD', delivery_days: '8-15' },
            { name: 'EMS', fee: 2.4, currency: 'USD', delivery_days: '5-10' },
            { name: '顺丰速运', fee: 2.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'DHL', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.1, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', fee: 3.0, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'IN',
        [
            { name: 'India Post', fee: 2.1, currency: 'USD', delivery_days: '6-10' },
            { name: 'DTDC', fee: 2.6, currency: 'USD', delivery_days: '5-9' },
            { name: 'BlueDart', fee: 2.7, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', fee: 3.3, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'ID',
        [
            { name: 'Pos Indonesia', fee: 2.0, currency: 'USD', delivery_days: '6-10' },
            { name: 'JNE', fee: 2.4, currency: 'USD', delivery_days: '5-9' },
            { name: 'TIKI', fee: 2.3, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', fee: 3.3, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'IT',
        [
            { name: 'Poste Italiane', fee: 2.3, currency: 'USD', delivery_days: '6-10' },
            { name: 'EMS', fee: 2.5, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', fee: 3.4, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', fee: 3.3, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'MX',
        [
            { name: 'Correos de México', fee: 2.4, currency: 'USD', delivery_days: '7-12' },
            { name: 'DHL', fee: 3.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'FedEx', fee: 3.5, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', fee: 3.4, currency: 'USD', delivery_days: '4-8' },
        ],
    ],
    [
        'NL',
        [
            { name: 'PostNL', fee: 2.2, currency: 'USD', delivery_days: '5-10' },
            { name: 'DHL', fee: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', fee: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'PL',
        [
            { name: 'Poczta Polska', fee: 2.1, currency: 'USD', delivery_days: '6-10' },
            { name: 'DHL', fee: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', fee: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'RU',
        [
            { name: 'Почта России', fee: 2.3, currency: 'USD', delivery_days: '8-15' },
            { name: 'EMS', fee: 2.6, currency: 'USD', delivery_days: '7-12' },
            { name: 'CDEK', fee: 2.9, currency: 'USD', delivery_days: '6-10' },
            { name: 'DHL', fee: 3.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', fee: 3.5, currency: 'USD', delivery_days: '4-8' },
        ],
    ],
    [
        'KR',
        [
            { name: '대한우편', fee: 2.0, currency: 'USD', delivery_days: '5-9' }, // Korea Post
            { name: 'CJ대한통운', fee: 2.4, currency: 'USD', delivery_days: '5-8' }, // CJ Logistics
            { name: 'DHL', fee: 3.2, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', fee: 3.1, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'ES',
        [
            { name: 'Correos España', fee: 2.2, currency: 'USD', delivery_days: '5-10' },
            { name: 'SEUR', fee: 2.7, currency: 'USD', delivery_days: '4-8' },
            { name: 'DHL', fee: 3.3, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', fee: 3.2, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', fee: 3.1, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'TR',
        [
            { name: 'PTT Posta', fee: 2.3, currency: 'USD', delivery_days: '6-10' },
            { name: 'Yurtiçi Kargo', fee: 2.6, currency: 'USD', delivery_days: '5-8' },
            { name: 'Aras Kargo', fee: 2.5, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', fee: 3.4, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', fee: 3.3, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
]);

export function getShippingOptions(code?: string): ShippingMethod[] {
    return shippingOptions.get(code as CountryCode) ?? shippingOptions.get('US')!;
}
