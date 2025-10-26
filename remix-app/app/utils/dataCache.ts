// dataCache.js
const cache: Record<string, any> = {};

export async function getJson(url: string) {
    if (cache[url]) return cache[url]; // ✅ 已缓存
    const res = await fetch(url);
    const json = await res.json();
    cache[url] = json; // ✅ 缓存到模块作用域
    return json;
}
