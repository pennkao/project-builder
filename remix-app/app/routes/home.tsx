//routes/home.tsx
import { useApi } from '@/hooks/useApi';
import HomePage from '@/pages/home';
import type { MetaFunction } from 'react-router';
import { SRC } from '../lib/images';
import type { Route } from './+types/home';

export function getRequestOrigin(request: Request) {
    const h = request.headers;

    const proto = h.get('x-forwarded-proto') ?? new URL(request.url).protocol.replace(':', '');

    const host = h.get('x-forwarded-host') ?? h.get('host');

    if (!host) {
        return null;
    }

    return `${proto}://${host}`;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { api } = useApi();
    const origin1 = getRequestOrigin(request);
    // const origin2 = window.location.origin;
    // console.log('origin2', origin2);
    console.log('origin1', origin1);
    const url = new URL(request.url);
    const origin = url.origin;
    console.log('origin', origin);
    const data = await api.setHeader('Origin', origin).doGetOne('site', 234134134);
    console.log('data', data);
    return data;
};

export const meta: MetaFunction = ({ loaderData }) => {
    const site = loaderData as { name: string; description: string; domain: string; image: string; config: Record<string, any> };
    const someas = site.config?.someas || [];
    const brand = site.config?.brand || site.name || 'shop';
    console.log('site', site, ']]]');
    return [
        // SEO 基础
        { title: `${site.name || ''} - ${brand}` },
        { name: 'description', content: site.description },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: site.name },
        { property: 'og:description', content: site.description },
        { property: 'og:url', content: site.domain },
        { property: 'og:image', content: SRC(site.image) },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: site.name },
        { name: 'twitter:description', content: site.description },
        { name: 'twitter:image', content: SRC(site.image) },
        { name: 'twitter:site', content: `@${brand}` },

        // JSON-LD（首页只放这个）
        {
            'script:ld+json': {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: site.name,
                url: site.domain,
                logo: SRC(site.image),
                sameAs: someas,
            },
        },
    ];
};

export default function Home({ loaderData }: Route.ComponentProps) {
    const data = loaderData;
    return (
        <>
            <HomePage data={data} />
        </>
    );
}
