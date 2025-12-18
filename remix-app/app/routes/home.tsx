//routes/home.tsx
import { useApi } from '@/lib/api.server';
import HomePage from '@/pages/home';
import type { MetaFunction } from 'react-router';
import { SRC } from '../lib/images';
import type { Route } from './+types/home';

function first(v: string | null) {
    return v?.split(',')[0]?.trim();
}

export function getRequestOrigin(request: Request): string {
    const h = request.headers;

    let proto = first(h.get('x-forwarded-proto')) || first(h.get('x-forwarded-scheme'));

    if (!proto) {
        const cf = h.get('cf-visitor');
        if (cf) {
            try {
                proto = JSON.parse(cf).scheme;
            } catch {}
        }
    }

    if (!proto) {
        proto = new URL(request.url).protocol.replace(':', '');
    }

    const host = first(h.get('x-forwarded-host')) || h.get('host');

    if (!host) return '';

    return `${proto}://${host}`;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { api } = useApi();
    const origin = getRequestOrigin(request);
    const data = await api.setHeader('Origin', origin).doGetOne('site', 234134134);
    return data;
};

export const meta: MetaFunction = ({ loaderData }) => {
    const site = loaderData as { name: string; description: string; domain: string; image: string; config: Record<string, any> };
    const someas = site.config?.someas || [];
    const brand = site.config?.brand || site.name || 'shop';
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
