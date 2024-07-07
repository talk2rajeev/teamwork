import * as CryptoJS from 'crypto-js';

export function storageEncryption() {
    /**
     * secret key should be stored in a safe place. This is only for a demo purpose.
    */
    let _key = "secret_key"

    function encrypt(txt: string) {
        return CryptoJS.AES.encrypt(txt, _key).toString();
    }

    function decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, _key).toString(CryptoJS.enc.Utf8);
    }

    function manipulateLocalStorage() {
        Storage.prototype.setEncryptedItem = (key: string, value: string) => {
            localStorage.setItem(key, encrypt(value));
        };

        Storage.prototype.getDecryptedItem = (key: string) => {
            let data = localStorage.getItem(key) || "";
            return decrypt(data) || null;
        }
    }
    /**
     * First call this function to add our custom functions to the Storage interface
     * 
     */
    manipulateLocalStorage();
    /**
     * you can use the setEncryptedItem and getDecryptedItem functions
     * to encrypt and decrypt the data
     * */ 

    sessionStorage.setEncryptedItem("token", "12345");
    const token = sessionStorage.getDecryptedItem("token");
    console.log(token);
}