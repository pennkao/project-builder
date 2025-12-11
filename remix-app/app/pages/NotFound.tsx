// app/components/NotFound.tsx
import { config } from '@/config/config';
import { Link } from 'react-router';

export default function NotFound({ title = 'Page not found', description }: { title?: string; description?: string }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-lg text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 mb-6 text-white text-2xl font-bold">404</div>

                <h1 className="text-3xl font-semibold mb-2">{title}</h1>
                {description ? <p className="text-gray-600 mb-6">{description}</p> : <p className="text-gray-600 mb-6">Sorry — we couldn't find that page.</p>}

                <div className="flex justify-center gap-3">
                    <Link to="/" className="px-4 py-2 rounded-md border border-transparent shadow-sm hover:shadow-lg focus:outline-none">
                        Go home
                    </Link>
                    <Link to={`https://www.google.com/search?q=${config.SEARCH_WORD}&sitesearch=${config.SEARCH_SITE}`} className="px-4 py-2 rounded-md border">
                        Search
                    </Link>
                </div>
            </div>
        </main>
    );
}
