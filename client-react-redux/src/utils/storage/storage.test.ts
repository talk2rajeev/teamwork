import { setSessionStorage, getSessionStorage } from './storage';
import * as CryptoJS from 'crypto-js';

jest.mock('crypto-js', () => {
  const originalModule = jest.requireActual('crypto-js');
  return {
    ...originalModule,
    AES: {
      encrypt: jest.fn((txt: string, key: string) =>
        originalModule.AES.encrypt(txt, key)
      ),
      decrypt: jest.fn((txtToDecrypt: string, key: string) =>
        originalModule.AES.decrypt(txtToDecrypt, key)
      ),
    },
  };
});

describe('Session Storage Utilities', () => {
  const SECRET_KEY = 'secret_key';

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should set and get encrypted data in session storage', () => {
    const token = 'my-secret-token';
    setSessionStorage('token', token);

    const encryptedToken = sessionStorage.getItem('token');
    expect(encryptedToken).not.toBeNull();

    const decryptedToken = getSessionStorage('token');
    expect(decryptedToken).toBe(token);
  });

  it('should return null if the key does not exist', () => {
    const value = getSessionStorage('nonexistent_key');
    expect(value).toBeNull();
  });

  it('should correctly encrypt data', () => {
    const token = 'my-secret-token';
    setSessionStorage('token', token);

    const encryptedToken = sessionStorage.getItem('token');
    expect(CryptoJS.AES.encrypt).toHaveBeenCalledWith(token, SECRET_KEY);
    expect(encryptedToken).not.toEqual(token); // Ensure it is encrypted and not plain text
  });

  it('should correctly decrypt data', () => {
    const token = 'my-secret-token';
    setSessionStorage('token', token);

    const encryptedToken = sessionStorage.getItem('token');
    const decryptedToken = getSessionStorage('token');
    expect(CryptoJS.AES.decrypt).toHaveBeenCalledWith(
      encryptedToken,
      SECRET_KEY
    );
    expect(decryptedToken).toEqual(token);
  });
});
