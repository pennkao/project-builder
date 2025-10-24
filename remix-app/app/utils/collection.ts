// utils/collectFingerprint.ts
export async function getWebRTCIP(): Promise<string | null> {
    return new Promise((resolve) => {
        const ips = new Set<string>();
        const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        pc.createDataChannel('');
        pc.onicecandidate = (e) => {
            if (!e.candidate) {
                pc.close();
                resolve(Array.from(ips)[0] || null);
                return;
            }
            const m = e.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
            if (m) ips.add(m[1]);
        };
        pc.createOffer().then((o) => pc.setLocalDescription(o));
    });
}
export async function collectFingerprint() {
    const opt = Object.assign({
        collectWebGL: true,
        collectAudio: true,
        collectWebRTC: true,
    });

    const safeSync = <T>(fn: () => T, fallback: T | null = null): T | null => {
        try {
            return fn();
        } catch {
            return fallback;
        }
    };

    const navigatorAny: any = navigator as any;
    const fingerprint: any = {
        ts: Date.now(),

        // 浏览器 & 系统
        language: safeSync(() => navigator.language),
        languages: safeSync(() => navigator.languages),
        locale: safeSync(() => Intl.NumberFormat().resolvedOptions().locale ?? null),
        timezone: safeSync(() => Intl.DateTimeFormat().resolvedOptions().timeZone ?? null),
        timezoneOffset: safeSync(() => new Date().getTimezoneOffset()),
        platform: safeSync(() => navigator.platform),
        deviceMemory: safeSync(() => navigatorAny.deviceMemory ?? null),
        hardwareConcurrency: safeSync(() => navigator.hardwareConcurrency ?? null),
        doNotTrack: safeSync(() => navigator.doNotTrack ?? null),
        cookieEnabled: safeSync(() => navigator.cookieEnabled ?? null),
        online: safeSync(() => navigator.onLine ?? null),

        // 屏幕信息
        screenWidth: safeSync(() => screen.width),
        screenHeight: safeSync(() => screen.height),
        availWidth: safeSync(() => screen.availWidth),
        availHeight: safeSync(() => screen.availHeight),
        innerWidth: safeSync(() => window.innerWidth),
        innerHeight: safeSync(() => window.innerHeight),
        outerWidth: safeSync(() => window.outerWidth),
        outerHeight: safeSync(() => window.outerHeight),
        devicePixelRatio: safeSync(() => window.devicePixelRatio),
        colorDepth: safeSync(() => screen.colorDepth),
        pixelDepth: safeSync(() => screen.pixelDepth),
        orientation: safeSync(() => (screen as any).orientation?.type ?? null),

        // 浏览器能力
        serviceWorker: safeSync(() => !!(navigator as any).serviceWorker),
        localStorage: safeSync(() => {
            try {
                localStorage.setItem('__fp_test', '1');
                localStorage.removeItem('__fp_test');
                return true;
            } catch {
                return false;
            }
        }),
        sessionStorage: safeSync(() => {
            try {
                sessionStorage.setItem('__fp_test', '1');
                sessionStorage.removeItem('__fp_test');
                return true;
            } catch {
                return false;
            }
        }),
        indexedDB: safeSync(() => !!(window as any).indexedDB),
        storageEstimate: safeSync(() => ((navigator as any).storage?.estimate ? (navigator as any).storage.estimate() : null)),

        // 网络 / 连接
        connection: safeSync(() =>
            (navigator as any).connection
                ? {
                      effectiveType: (navigator as any).connection.effectiveType,
                      downlink: (navigator as any).connection.downlink,
                      rtt: (navigator as any).connection.rtt,
                      saveData: (navigator as any).connection.saveData,
                  }
                : null
        ),

        // 渲染 / Canvas
        canvasFp: safeSync(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 60;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            ctx.textBaseline = 'top';
            ctx.font = "16px 'Arial'";
            ctx.fillStyle = '#f60';
            ctx.fillRect(0, 0, 200, 60);
            ctx.fillStyle = '#069';
            ctx.fillText('Fingerprint Test ' + navigator.language, 2, 2);
            return canvas.toDataURL();
        }, null),

        webgl: null,
        audioFp: null,
        webrtcIps: null,
    };

    // WebGL 指纹
    // if (opt.collectWebGL) {
    fingerprint.webgl = safeSync(() => {
        const canvas = document.createElement('canvas');
        const glRaw = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!glRaw) return null;
        const gl = glRaw as WebGLRenderingContext;
        const dbg = gl.getExtension('WEBGL_debug_renderer_info');
        return {
            vendor: dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : null,
            renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
            shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
            vendorMasked: gl.getParameter(gl.VENDOR),
            rendererMasked: gl.getParameter(gl.RENDERER),
            extensions: gl.getSupportedExtensions?.() || [],
        };
    }, null);
    // }

    // Audio 指纹
    fingerprint.audioFp = await safeSync(async () => {
        const AudioContext = (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
        if (!AudioContext) return null;
        const ctx = new AudioContext(1, 44100, 44100);
        const oscillator = ctx.createOscillator();
        const analyser = ctx.createAnalyser();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 10000;
        oscillator.connect(analyser);
        analyser.connect(ctx.destination);
        oscillator.start(0);
        return 'audio-fp-placeholder';
    }, null);
    // }

    // WebRTC 指纹
    // if (opt.collectWebRTC) {
    fingerprint.webrtcIps = await getWebRTCIP(); // await safeSync(async () => {
    // }

    return fingerprint;
}
