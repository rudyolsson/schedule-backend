import { compare, hash } from 'bcryptjs';
import * as aesjs from 'aes-js';

const saltRound = 15;
const key = [33, 22, 25, 47, 78, 61, 60, 64, 24, 46, 64, 52, 70, 40, 65, 27];

export class CryptoUtils {
  static getHash(password: string): Promise<string> {
    return hash(password, saltRound);
  }

  static compareHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  static encrypt(text: string): string {
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(
      key,
      new aesjs.Counter(saltRound),
    );
    const encryptedBytes = aesCtr.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  static decrypt(encryptText: string): string {
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptText);
    const aesCtr = new aesjs.ModeOfOperation.ctr(
      key,
      new aesjs.Counter(saltRound),
    );
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }
}
