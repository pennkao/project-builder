import { formatPrice } from '@/utils/money';
export function denormalizeProduct<T extends ProductType>(raws: T) {
    return {
        ...raws,
        main: { ...raws.main, price: formatPrice(raws.main.price) },
        skus: denormalizeProductSkus(raws.skus),
    };
}

export function denormalizeProductList<T extends ProductItemType>(raws: T[]) {
    return raws.map((raw) => ({
        ...raw,
        price: formatPrice(raw.price),
    }));
}

export function denormalizeProductSkus<T extends SkuType>(raws: T[]) {
    return raws.map((raw) => ({
        ...raw,
        price: formatPrice(raw.price),
    }));
}
