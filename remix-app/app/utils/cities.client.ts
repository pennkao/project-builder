// app/utils/cities.client.ts
const cache: Record<string, any[]> = {};
const cacheCities: Record<string, any[]> = {};

export async function fetchStates(countryCode: string) {
    if (cache[countryCode]) return cache[countryCode];

    const res = await fetch(`/data/states/${countryCode}.states.json`);
    // console.log('fetchStates', countryCode, res);

    if (!res.ok) throw new Error(`Failed to load ${countryCode} states`);

    const data = await res.json();
    cache[countryCode] = data;
    return data;
}

export async function fetchCities(countryCode: string) {
    if (cacheCities[countryCode]) return cacheCities[countryCode];

    const res = await fetch(`/data/cities/${countryCode}.cities.json`);
    console.log('fetchCities', countryCode, res);

    if (!res.ok) throw new Error(`Failed to load ${countryCode} cities`);

    const data = await res.json();
    cacheCities[countryCode] = data;
    return data;
}
