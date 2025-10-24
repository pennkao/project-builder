import { collectFingerprint } from '@/utils/collection';
import { DateTime } from 'luxon';



export async function detect() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const offset = new Date().getTimezoneOffset();
    const lang = Intl.NumberFormat().resolvedOptions().locale;
    console.log('lang', lang, 'offset', offset, 'tz', tz);
    // WebRTC 获取公网IP（可选）
    // const webrtcIp = await getWebRTCIP();
    // console.log('webrtcIp', webrtcIp);
    const fp = await collectFingerprint();
    console.log(fp);

    const res = await fetch('/detect', {
        method: 'POST',
        body: JSON.stringify({ tz, offset, lang }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.risk > 1) {
        // window.location.href = "https://www.baidu.com";
    }
}

export function calcTimezoneDiff(serverTz: string | undefined, offsetMinutes: number) {
    if (!serverTz) return 99; // 无法判断
    try {
        // 当前 UTC 时间
        const nowUTC = DateTime.utc();
        // Server IP 时区时间
        const serverTime = nowUTC.setZone(serverTz);
        // 浏览器偏移转换为 IANA
        const browserTime = nowUTC.minus({ minutes: offsetMinutes });
        // 差值（小时）
        const diff = Math.abs(serverTime.hour - browserTime.hour);
        console.log('calcTimezoneDiff', serverTz, offsetMinutes, diff);
        return diff;
    } catch (e) {
        return 99;
    }
}
