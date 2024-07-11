// import * as CryptoJS from 'crypto-js';

// export function storageEncryption() {
//   console.log('inside storageEncryption func');
//   /**
//    * secret key should be stored in a safe place. This is only for a demo purpose.
//    */
//   let _key = 'secret_key';

//   function encrypt(txt: string) {
//     return CryptoJS.AES.encrypt(txt, _key).toString();
//   }

//   function decrypt(txtToDecrypt: string) {
//     return CryptoJS.AES.decrypt(txtToDecrypt, _key).toString(CryptoJS.enc.Utf8);
//   }

//   function manipulateLocalStorage() {
//     Storage.prototype.setEncryptedItem = (key: string, value: string) => {
//       sessionStorage.setItem(key, encrypt(value));
//     };

//     Storage.prototype.getDecryptedItem = (key: string) => {
//       let data = sessionStorage.getItem(key) || '';
//       return decrypt(data) || null;
//     };
//   }
//   /**
//    * First call this function to add our custom functions to the Storage interface
//    *
//    */
//   manipulateLocalStorage();
// }

// export function setSessionStorage(key: string, value: string) {
//   sessionStorage.setEncryptedItem(key, value);
// }

// export function getSessionStorage(key: string) {
//   return sessionStorage.getDecryptedItem(key);
// }

// Secret key should be stored in a safe place. This is only for demo purposes.

import * as CryptoJS from 'crypto-js';

// Secret key should be stored in a safe place. This is only for demo purposes.
const SECRET_KEY = 'secret_key';

function encrypt(txt: string): string {
  return CryptoJS.AES.encrypt(txt, SECRET_KEY).toString();
}

function decrypt(txtToDecrypt: string): string {
  if (!txtToDecrypt) {
    return '';
  }

  const bytes = CryptoJS.AES.decrypt(txtToDecrypt, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function setSessionStorage(key: string, value: string): void {
  const encryptedValue = encrypt(value);
  sessionStorage.setItem(key, encryptedValue);
}

export function getSessionStorage(key: string): string {
  const data = sessionStorage.getItem(key);
  if (!data) {
    return '';
  }
  return decrypt(data);
}
