// MainLayout.tsx
import { Keys } from '@/config/keys';
import { detect } from '@/utils/location';
import { sha256 } from '@/utils/tools';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { doPut } from '../utils/api';
import { collectFingerprint } from '../utils/collection';
const MainLayout = () => {
    useEffect(() => {
        let cancelled = false;

        // 延迟一点时间，避免与首屏加载竞争
        setTimeout(() => {
            const ipInfo = localStorage.getItem(Keys.IP);
            const uuid = localStorage.getItem(Keys.UUID);
            if (!ipInfo || !uuid) {
                detect();
                (async () => {
                    const fps = await collectFingerprint();
                    const ukey = await sha256(JSON.stringify(fps));
                    const ips = await fetch('https://ipapi.co/json').then((res) => res.json());
                    localStorage.setItem(Keys.UUID, ukey);
                    localStorage.setItem(Keys.IP, JSON.stringify(ips));
                    doPut('google', { ukey: ukey, ips: ips, fps: fps, ts: Date.now(), source: 'web1' });
                })();
            }
        }, 1000); // 延迟 0.5 秒加载

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        // MainLayout.tsx
        <main className={`min-h-screen bg-page max-w-4xl mx-auto overflow-scroll`}>
            <Outlet />
        </main>
    );
};

export default MainLayout;
