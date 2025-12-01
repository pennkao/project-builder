// import { Cache_Key, Cdn_Config } from '@/config/cdn';

// let cdnPromise: Promise<string> | null = null;
// let cachedBase: string | null = null;

// export async function detectFastestCdnOnce1(): Promise<string> {
//     if (cachedBase) return cachedBase;

//     if (typeof window === 'undefined') return Cdn_Config.defaultBase;

//     const local = localStorage.getItem(Cache_Key);
//     if (local) {
//         cachedBase = local;
//         return cachedBase;
//     }

//     if (cdnPromise) return cdnPromise;

//     cdnPromise = new Promise(async (resolve) => {
//         const testImage = Cdn_Config.defaultPlaceholder;
//         const bases = [Cdn_Config.defaultBase, ...Cdn_Config.fallbacks];

//         const results: { base: string; time: number }[] = [];

//         await Promise.all(
//             bases.map(
//                 (base) =>
//                     new Promise<void>((res) => {
//                         const img = new Image();
//                         const start = performance.now();

//                         const timer = setTimeout(() => {
//                             res(); // 超时，忽略
//                         }, Cdn_Config.timeout);

//                         img.onload = () => {
//                             clearTimeout(timer);
//                             results.push({ base, time: performance.now() - start });
//                             res();
//                         };

//                         img.onerror = () => {
//                             clearTimeout(timer);
//                             res(); // 出错也忽略
//                         };

//                         img.src = base + testImage + '?_=' + Math.random();
//                     })
//             )
//         );

//         // 取最快成功的 CDN
//         results.sort((a, b) => a.time - b.time);
//         const fastest = results[0]?.base || Cdn_Config.fallbacks[Cdn_Config.fallbacks.length - 1];

//         cachedBase = fastest;
//         localStorage.setItem(Cache_Key, fastest);
//         resolve(fastest);
//     });

//     return cdnPromise;
// }
