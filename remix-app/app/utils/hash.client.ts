// utils/encrypt.ts
import CryptoJS from 'crypto-js';

// const SECRET_KEY = 'my32charlongsecretkeyforaesdemo'; // 32字节 = 256位
// const IV = '16byteslongiv123'; // 16字节 = 128位（用于 CBC 模式）

export function encryptData(data: Record<string, any>, IV: string, SECRET_KEY: string): string {
    const jsonStr = JSON.stringify(data);
    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(IV);

    const encrypted = CryptoJS.AES.encrypt(jsonStr, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString(); // Base64 字符串
}
