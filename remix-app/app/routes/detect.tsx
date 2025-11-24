import { getGeoInfo } from '@/utils/geoip.server';
import { calcTimezoneDiff } from '@/utils/location';
import { getClientIP } from '@/utils/serverfunc';
import { type ActionFunction } from '@remix-run/node';
const response = (risk: number) => {
    return new Response(JSON.stringify({ risk: risk }), {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return response(1);
    }
    const origin = request.headers.get('origin');
    if (origin && !origin.includes('localhost')) {
        return response(0);
    }

    const body = await request.json();
    const { tz, offset, lang, canvasFp, webrtcIp } = body;
    if (lang.includes('zh')){
        return response(1);
    }
    const ip = getClientIP(request);
    if (ip.includes('0.0.0.0') || ip.includes('127.0.0.1')) {
        // return response(0);
    }
    if (!webrtcIp || webrtcIp !== ip) {
        return response(1);
    }

    const geo = await getGeoInfo(ip);
    const serverTz = geo?.timezone;
    console.log('geo', geo);

    const tzDiff = calcTimezoneDiff(serverTz as string | undefined, offset);
    if (tzDiff > 1) {
        return response(1);
    }
    if (geo?.isCloud || !canvasFp) {
        return response(1);
    }

    return response(0);
};
