import { formatPrice, priceToCents } from '@/utils';

export function normalizeProduct<T extends ProductMainType | ProductItemType>(raw: T) {
    console.log(raw);
    return {
        ...raw,
        price: formatPrice(raw.price),
        // 其他金额字段也统一转
    };
}

export function normalizeProductSkus<T extends SkuType>(raws: T[]) {
    return raws.map((raw) => ({
        ...raw,
        price: formatPrice(raw.price),
        // 其他金额字段也统一转
    }));
}

export function denormalizeProduct<T extends ProductMainType | ProductItemType>(raw: T) {
    return {
        ...raw,
        price: priceToCents(raw.price),
        // 其他金额字段也统一转
    };
}

export function denormalizeProductSkus<T extends SkuType>(raws: T[]) {
    return raws.map((raw) => ({
        ...raw,
        price: priceToCents(raw.price),
        // 其他金额字段也统一转
    }));
}
