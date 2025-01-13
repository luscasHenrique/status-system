import CryptoJS from 'crypto-js';

const encrypt = (value: string): string => {
  const { REACT_APP_KEY_CRIPTO, REACT_APP_IV_CRIPTO } = process.env;
  const data = CryptoJS.enc.Utf8.parse(value);
  const key = CryptoJS.enc.Utf8.parse(REACT_APP_KEY_CRIPTO as string);
  const iv = CryptoJS.enc.Utf8.parse(REACT_APP_IV_CRIPTO as string);

  const encrypted = CryptoJS.AES.encrypt(data, key, {
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.ECB,
    iv,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

const decrypt = (value: string): string => {
  const { REACT_APP_KEY_CRIPTO, REACT_APP_IV_CRIPTO } = process.env;
  const ciphertext = CryptoJS.enc.Base64.parse(value);
  const key = CryptoJS.enc.Utf8.parse(REACT_APP_KEY_CRIPTO as string);
  const iv = CryptoJS.enc.Utf8.parse(REACT_APP_IV_CRIPTO as string);
  const cipherParams = {
    ciphertext,
  } as CryptoJS.lib.CipherParams;
  const decripted = CryptoJS.AES.decrypt(cipherParams, key, {
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.ECB,
    iv,
  });
  return decripted.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
