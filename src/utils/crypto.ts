// 加密、解密
import CryptoJS from "crypto-js";

// AES偏移量 16位  key和iv可以一样 (加密/解密方式：aes-128-cbc)
const key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");

//加密 md5：是否使用md5(不可逆：密码)
const encrypt = (data: string, md5 = false) => {
  data = md5 ? CryptoJS.MD5("copyright." + data).toString() : data;
  const secretData = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(secretData, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

//解密
const decrypt = (data: string | CryptoJS.lib.CipherParams) => {
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

export { encrypt, decrypt };
