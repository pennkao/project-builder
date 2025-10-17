// render-snippets.vite.ts
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

(async () => {
    console.log('🚀 Starting render-snippets');

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
    });

    console.log('✅ Vite server started');

    // 统一路径解析函数
    const r = (p: string) => path.resolve(process.cwd(), p);

    const modules = {
        header: await vite.ssrLoadModule(r('src/features/app/components/AppHeader/index.tsx')),
        footer: await vite.ssrLoadModule(r('src/features/app/components/AppFooter/index.tsx')),
        app: await vite.ssrLoadModule(r('src/app/App.tsx')),
    };

    console.log('✅ Modules loaded:', Object.keys(modules));

    for (const [name, mod] of Object.entries(modules)) {
        const Component = mod.default;
        if (!Component) {
            console.warn(`⚠️ No default export found in ${name}`);
            continue;
        }
        const html = renderToString(React.createElement(Component));
        const output = r(`go/templates/${name}.html`);
        fs.mkdirSync(path.dirname(output), { recursive: true });
        fs.writeFileSync(output, html);
        console.log(`✅ Generated: ${output}`);
    }

    await vite.close();
    console.log('🏁 Done!');
})();
