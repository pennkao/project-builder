interface SiteLogType {
    id: number; // BIGSERIAL PRIMARY KEY
    ukey: string; // TEXT
    source: string; // TEXT
    ts: number; // BIGINT (时间戳 or 毫秒)
    fps: DeviceInfoType; // JSONB 数组
    ips: IpInfoType; // JSONB 数组
    cts: number; // BIGINT (时间戳 or 毫秒)
}

interface DeviceInfoType {
    webgl: WebGLInfo;
    locale: string;
    online: boolean;
    audioFp: string;
    canvasFp: string;
    language: string;
    platform: string;
    timezone: string;
    indexedDB: boolean;
    languages: string[];
    webrtcIps: string;
    availWidth: number;
    colorDepth: number;
    connection: ConnectionInfo;
    doNotTrack: string;
    innerWidth: number;
    outerWidth: number;
    pixelDepth: number;
    availHeight: number;
    innerHeight: number;
    orientation: string;
    outerHeight: number;
    screenWidth: number;
    deviceMemory: number;
    localStorage: boolean;
    screenHeight: number;
    cookieEnabled: boolean;
    serviceWorker: boolean;
    sessionStorage: boolean;
    timezoneOffset: number;
    storageEstimate: Record<string, any>;
    devicePixelRatio: number;
    hardwareConcurrency: number;
}

/* ---------------- WebGL ---------------- */

interface WebGLInfo {
    vendor: string;
    renderer: string;
    extensions: string[];
    vendorMasked: string;
    rendererMasked: string;
    shadingLanguageVersion: string;
}

/* ---------------- Network Connection ---------------- */

interface ConnectionInfo {
    rtt: number;
    downlink: number;
    saveData: boolean;
    effectiveType: string;
}

interface IpInfoType {
    ip: string;
    asn: string;
    org: string;
    city: string | null;
    in_eu: boolean;
    postal: string | null;
    region: string | null;
    country: string;
    network: string;
    version: string;
    currency: string;
    latitude: number;
    timezone: string;
    languages: string;
    longitude: number;
    utc_offset: string;
    country_tld: string;
    region_code: string | null;
    country_area: number;
    country_code: string;
    country_name: string;
    currency_name: string;
    continent_code: string;
    country_capital: string;
    country_code_iso3: string;
    country_population: number;
    country_calling_code: string;
}
