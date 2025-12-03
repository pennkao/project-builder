export function formatPrice(price: number | string) {
    if (typeof price === 'string') {
        price = Number(price);
    }
    return String(price / 100);
}

export function priceToCents(input: number | string): number {
    const str = String(input).trim();

    const [intPart, decimalPart = ''] = str.split('.');

    return parseInt(intPart, 10) * 100 + parseInt((decimalPart + '00').slice(0, 2), 10);
}
