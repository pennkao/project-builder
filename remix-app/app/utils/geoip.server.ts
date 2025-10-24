import * as maxmind from 'maxmind';
import path from 'path';

const dbPath = path.resolve('./app/data/GeoLite2-City.mmdb');
let cityReader: maxmind.Reader<maxmind.CityResponse> | null = null;

export async function getGeoInfo(ip: string) {
    if (!cityReader) {
        cityReader = await maxmind.open<maxmind.CityResponse>(dbPath);
    }
    const geo = cityReader.get(ip);
    return {
        country: geo?.country?.iso_code || null,
        timezone: geo?.location?.time_zone || null,
        city: geo?.city?.names?.en || null,
        isCloud: isCloudASN(geo?.traits?.autonomous_system_number),
    };
}

// 简单云ASN检测
function isCloudASN(asn?: number) {
    const cloudASN = [15169, 16509, 8075, 14618]; // Google, AWS, Microsoft, Oracle
    return asn ? cloudASN.includes(asn) : false;
}
