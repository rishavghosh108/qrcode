// src/app/services/qr-code.service.ts
import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  generateQrCode(data: string): Promise<string> {
    return QRCode.toDataURL(data, { errorCorrectionLevel: 'H' });
  }
}
