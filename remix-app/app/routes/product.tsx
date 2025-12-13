//routes/product.tsx
import { createApi } from '@/hooks/useApi';
import { denormalizeProduct } from '@/lib/convert';
import { SRC } from '@/lib/images';
import ProductPage from '@/pages/product';
import { fnv1a32 } from '@/utils/tools';
import type { MetaFunction } from 'react-router';
import type { Route } from './+types/product';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { handle } = params;
    const api = createApi();
    const id = fnv1a32(handle);
    const url = new URL(request.url);
    const origin = url.origin;
    const res = await api.setHeader('Origin', origin).doGet<ProductType>('product', { id: id });
    if (!res) throw new Response('Not found', { status: 404 });
    return denormalizeProduct(res);
};

export const meta: MetaFunction = ({ loaderData }) => {
    const data = loaderData as ProductType;
    const product = data.main;
    return [
        { title: product.title },
        { name: 'description', content: product.description },

        //card| 页面类型      | 推荐 og:type |
        // | --------- | ---------- |
        // | 首页        | `website`  |
        // | 分类页       | `website`  |
        // | 商品详情页     | `product`  |
        // | 博客文章      | `article`  |
        // | 落地页 / 营销页 | `website`  |
        // | 用户主页      | `profile`  |

        { property: 'og:type', content: 'product' },
        { property: 'og:title', content: product.title },
        { property: 'og:description', content: product.description },
        { property: 'og:url', content: '' },
        { property: 'og:image', content: SRC(product.main_image) },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: product.title },
        { name: 'twitter:description', content: product.description },
        { name: 'twitter:image', content: SRC(product.main_image) },
        { name: 'twitter:site', content: '@biiyea' },
        { name: 'twitter:creator', content: '@biiyea' },
        {
            'script:ld+json': {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Remix',
                url: 'https://remix.org.cn',
                logo: 'https://remix.org.cn/logo.png',
                sameAs: ['https://twitter.com/remix_run', 'https://github.com/remix-run', 'https://discord.gg/remix'],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer support',
                    email: 'support@remix.org.cn',
                    availableLanguage: ['English', 'Chinese'],
                },
            },
        },
    ];
};

export default function Product({ loaderData }: Route.ComponentProps) {
    const data = loaderData as ProductType;
    return (
        <>
            <ProductPage productData={data} />
        </>
    );
}
