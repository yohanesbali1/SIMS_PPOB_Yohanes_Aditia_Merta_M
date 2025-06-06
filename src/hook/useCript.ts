import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key';
const EXPIRY_HOURS = 12;

interface Payload {
    data: string;
    timestamp: number;
}

export function encryptWithExpiry(data: string): string {
    const payload: Payload = {
        data,
        timestamp: Date.now(),
    };

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();
    return ciphertext;
}

export function decryptWithExpiry(ciphertext: string): { data: string; expired: boolean } | null {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedStr) return null;

        const payload: Payload = JSON.parse(decryptedStr);
        const now = Date.now();
        const diffHours = (now - payload.timestamp) / (1000 * 60 * 60);

        if (diffHours > EXPIRY_HOURS) {
            return { data: '', expired: true };
        }

        return { data: payload.data, expired: false };
    } catch (error) {
        return null;
    }
}
