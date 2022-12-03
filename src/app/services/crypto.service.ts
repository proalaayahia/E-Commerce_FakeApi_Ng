import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  /**
   *
   */
  key: string = environment.encKey
  constructor() { }

  encryptData(data: any) {
    // Encrypt
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }

  decryptData(data: any) {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(data, this.key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
