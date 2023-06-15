
import CryptoJS from "crypto-js";
export function encryptData(data) {
        var key = CryptoJS.enc.Latin1.parse('1234567812345678');
        var iv = CryptoJS.enc.Latin1.parse('1234567812345678');
        var encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            key,
            {
                iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
            });
        console.log('encrypted: ' +encrypted);
    return encrypted.toString();
}

// Send the encrypted data to the server
