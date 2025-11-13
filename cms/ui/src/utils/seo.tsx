const PersonReviewAuthor = { '@type': 'Person', name: 'Verified Buyer' };
// const OrganizationReviewAuthor = { '@type': 'Organization', name: 'Your Store Name' };
// const TechRadarReviewAuthor = { '@type': 'Organization', name: 'TechRadar' };
export const seoData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: '',
    image: [],
    description: '',
    sku: ['IP15PRO256GB-BLUE', 'IP15PRO512GB-GOLD'],
    category: 'Smartphones',
    mpn: 'A3101', //制造商编号
    seller: {
        '@type': 'Organization',
        name: 'Apple Store',
    },
    brand: {
        '@type': 'Brand',
        name: '',
    },
    offers: {
        '@type': 'Offer',
        url: 'https://example.com/iphone-15-pro',
        priceCurrency: 'USD',
        price: '0.00',
        itemCondition: 'https://schema.org/NewCondition', // ✅ 商品状态
        availability: 'https://schema.org/InStock',
        seller: {
            '@type': 'Organization',
            name: 'Apple Store',
        },
    },

    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '20',
    },
    review: [
        {
            '@type': 'Review',
            author: PersonReviewAuthor,
            datePublished: '2020-10-01',
            reviewBody: 'Amazing performance and camera!',
            reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
            },
        },
    ],
};

export function getSeoJson(title: string) {
    seoData.name = title ;
    return JSON.stringify(seoData);
}
