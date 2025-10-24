import { getGeoInfo } from '@/utils/geoip.server';
import { calcTimezoneDiff } from '@/utils/location';
import { type ActionFunction } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return new Response('', { status: 404 });
    }
    const origin = request.headers.get('origin');
    if (origin && !origin.includes('localhost')) {
        return new Response('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { tz, offset, lang, canvasFp, webrtcIp } = body;

    const forwardedFor = request.headers.get('x-forwarded-for');
    console.log('forwardedFor', forwardedFor);
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const geo = await getGeoInfo(ip);
    const serverTz = geo?.timezone;
    console.log('geo', geo);

    const tzDiff = calcTimezoneDiff(serverTz as string | undefined, offset);

    let risk = 0;
    if (geo?.isCloud) risk += 40;
    if (tzDiff > 3) risk += 30;
    if (!webrtcIp || webrtcIp !== ip) risk += 20;
    if (!canvasFp) risk += 10;

    let status = '正常';
    if (risk >= 50) status = '可疑';
    if (risk >= 80) status = '高风险';
    if (risk >= 50) {
        // return redirect('https://www.baidu.com');
    }
    return new Response(JSON.stringify({ status, risk }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
