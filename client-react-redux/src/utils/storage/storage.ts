import * as CryptoJS from 'crypto-js';

export function storageEncryption() {
  console.log('inside storageEncryption func');
  /**
   * secret key should be stored in a safe place. This is only for a demo purpose.
   */
  let _key = 'secret_key';

  function encrypt(txt: string) {
    return CryptoJS.AES.encrypt(txt, _key).toString();
  }

  function decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, _key).toString(CryptoJS.enc.Utf8);
  }

  function manipulateLocalStorage() {
    Storage.prototype.setEncryptedItem = (key: string, value: string) => {
      sessionStorage.setItem(key, encrypt(value));
    };

    Storage.prototype.getDecryptedItem = (key: string) => {
      let data = sessionStorage.getItem(key) || '';
      return decrypt(data) || null;
    };
  }
  /**
   * First call this function to add our custom functions to the Storage interface
   *
   */
  manipulateLocalStorage();
}

export function setSessionStorage(key: string, value: string) {
  sessionStorage.setEncryptedItem(key, value);
}

export function getSessionStorage(key: string) {
  return sessionStorage.getDecryptedItem(key);
}
