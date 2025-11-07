// app/utils/cities.client.ts
const cache: Record<string, any[]> = {};
const cacheCities: Record<string, any[]> = {};

export async function fetchStates(countryCode: string) {
    if (cache[countryCode]) return cache[countryCode];

    const res = await fetch(`/states/${countryCode}.states.json`);
    // console.log('fetchStates', countryCode, res);

    if (!res.ok) throw new Error(`Failed to load ${countryCode} states`);

    const data = await res.json();
    cache[countryCode] = data;
    return data;
}
