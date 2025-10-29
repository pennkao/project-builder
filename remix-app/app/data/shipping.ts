// src/data/shipping.ts

export type ShippingMethod = {
    name: string;
    price: number; // 按 0.1kg 价格
    currency: 'USD' | 'CNY' | 'EUR';
    delivery_days: string;
};

export type CountryCode = 'GB' | 'JP' | 'US' | 'FR' | 'CA' | 'AU' | 'DE' | 'SA' | 'BR' | 'CN' | 'IN' | 'ID' | 'IT' | 'MX' | 'NL' | 'PL' | 'RU' | 'KR' | 'ES' | 'TR';

export const shippingOptions = new Map<CountryCode, ShippingMethod[]>([
    [
        'GB',
        [
            { name: 'Royal Mail', price: 2.2, currency: 'USD', delivery_days: '5-10' },
            { name: 'Parcel Force', price: 2.5, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', price: 3.5, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.6, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', price: 3.4, currency: 'USD', delivery_days: '3-6' },
            { name: 'EMS', price: 2.8, currency: 'USD', delivery_days: '6-10' },
        ],
    ],
    [
        'JP',
        [
            { name: 'Japan Post', price: 2.0, currency: 'USD', delivery_days: '5-10' },
            { name: 'EMS', price: 2.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'DHL', price: 3.4, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', price: 3.3, currency: 'USD', delivery_days: '3-5' },
            { name: 'Yamato', price: 2.5, currency: 'USD', delivery_days: '5-8' },
            { name: 'Sagawa', price: 2.4, currency: 'USD', delivery_days: '5-8' },
        ],
    ],
    [
        'US',
        [
            { name: 'USPS', price: 2.4, currency: 'USD', delivery_days: '5-10' },
            { name: 'UPS', price: 3.2, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.3, currency: 'USD', delivery_days: '3-5' },
            { name: 'DHL', price: 3.4, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'FR',
        [
            { name: 'La Poste', price: 2.3, currency: 'USD', delivery_days: '6-10' },
            { name: 'Colissimo', price: 2.5, currency: 'USD', delivery_days: '5-9' },
            { name: 'Chronopost', price: 2.8, currency: 'USD', delivery_days: '4-7' },
            { name: 'DHL', price: 3.5, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', price: 3.4, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', price: 3.3, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'CA',
        [
            { name: 'Canada Post', price: 2.3, currency: 'USD', delivery_days: '5-10' },
            { name: 'Purolator', price: 2.7, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', price: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-5' },
            { name: 'DHL', price: 3.3, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'AU',
        [
            { name: 'Australia Post', price: 2.4, currency: 'USD', delivery_days: '5-10' },
            { name: 'DHL', price: 3.2, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', price: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'TNT', price: 2.9, currency: 'USD', delivery_days: '4-7' },
        ],
    ],
    [
        'DE',
        [
            { name: 'Deutsche Post', price: 2.2, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', price: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'Hermes', price: 2.7, currency: 'USD', delivery_days: '4-7' },
            { name: 'UPS', price: 3.1, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'SA',
        [
            { name: 'Saudi Post', price: 2.6, currency: 'USD', delivery_days: '6-10' },
            { name: 'Aramex', price: 2.9, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', price: 3.5, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', price: 3.4, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'BR',
        [
            { name: 'Correios', price: 2.7, currency: 'USD', delivery_days: '8-15' },
            { name: 'DHL', price: 3.8, currency: 'USD', delivery_days: '4-8' },
            { name: 'FedEx', price: 3.7, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', price: 3.6, currency: 'USD', delivery_days: '4-8' },
        ],
    ],
    [
        'CN',
        [
            { name: 'China Post', price: 1.8, currency: 'USD', delivery_days: '8-15' },
            { name: 'EMS', price: 2.4, currency: 'USD', delivery_days: '5-10' },
            { name: 'SF Express', price: 2.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'DHL', price: 3.2, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.1, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', price: 3.0, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'IN',
        [
            { name: 'India Post', price: 2.1, currency: 'USD', delivery_days: '6-10' },
            { name: 'DTDC', price: 2.6, currency: 'USD', delivery_days: '5-9' },
            { name: 'BlueDart', price: 2.7, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', price: 3.3, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'ID',
        [
            { name: 'Pos Indonesia', price: 2.0, currency: 'USD', delivery_days: '6-10' },
            { name: 'JNE', price: 2.4, currency: 'USD', delivery_days: '5-9' },
            { name: 'TIKI', price: 2.3, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', price: 3.3, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'IT',
        [
            { name: 'Poste Italiane', price: 2.3, currency: 'USD', delivery_days: '6-10' },
            { name: 'EMS', price: 2.5, currency: 'USD', delivery_days: '5-9' },
            { name: 'DHL', price: 3.4, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', price: 3.3, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'MX',
        [
            { name: 'Correos de México', price: 2.4, currency: 'USD', delivery_days: '7-12' },
            { name: 'DHL', price: 3.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'FedEx', price: 3.5, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', price: 3.4, currency: 'USD', delivery_days: '4-8' },
        ],
    ],
    [
        'NL',
        [
            { name: 'PostNL', price: 2.2, currency: 'USD', delivery_days: '5-10' },
            { name: 'DHL', price: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', price: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'PL',
        [
            { name: 'Poczta Polska', price: 2.1, currency: 'USD', delivery_days: '6-10' },
            { name: 'DHL', price: 3.0, currency: 'USD', delivery_days: '3-6' },
            { name: 'UPS', price: 3.1, currency: 'USD', delivery_days: '3-6' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
    [
        'RU',
        [
            { name: 'Russian Post', price: 2.3, currency: 'USD', delivery_days: '8-15' },
            { name: 'EMS', price: 2.6, currency: 'USD', delivery_days: '7-12' },
            { name: 'CDEK', price: 2.9, currency: 'USD', delivery_days: '6-10' },
            { name: 'DHL', price: 3.6, currency: 'USD', delivery_days: '4-8' },
            { name: 'UPS', price: 3.5, currency: 'USD', delivery_days: '4-8' },
        ],
    ],
    [
        'KR',
        [
            { name: 'Korea Post', price: 2.0, currency: 'USD', delivery_days: '5-9' },
            { name: 'CJ Logistics', price: 2.4, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', price: 3.2, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', price: 3.1, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'ES',
        [
            { name: 'Correos España', price: 2.2, currency: 'USD', delivery_days: '5-10' },
            { name: 'SEUR', price: 2.7, currency: 'USD', delivery_days: '4-8' },
            { name: 'DHL', price: 3.3, currency: 'USD', delivery_days: '3-5' },
            { name: 'FedEx', price: 3.2, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', price: 3.1, currency: 'USD', delivery_days: '3-5' },
        ],
    ],
    [
        'TR',
        [
            { name: 'PTT Posta', price: 2.3, currency: 'USD', delivery_days: '6-10' },
            { name: 'Yurtici', price: 2.6, currency: 'USD', delivery_days: '5-8' },
            { name: 'Aras', price: 2.5, currency: 'USD', delivery_days: '5-8' },
            { name: 'DHL', price: 3.4, currency: 'USD', delivery_days: '3-5' },
            { name: 'UPS', price: 3.3, currency: 'USD', delivery_days: '3-6' },
        ],
    ],
]);

export function getShippingOptions(code?: string): ShippingMethod[] {
    return shippingOptions.get(code as CountryCode) ?? shippingOptions.get('US')!;
}
