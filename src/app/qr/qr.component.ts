import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnChanges {

  @Input() name: string = "rishav";
  @Input() upi: string = "rishavghosh147-10@okhdfcbank";
  @Input() amount!: number;
  @Input() url!: string;

  qrData: string = '';
  width = 400;

  ngOnChanges(changes: SimpleChanges) {
    // Update qrData whenever input properties change
    this.qrData = `upi://pay?pa=${this.upi}&pn=${this.name}&am=${this.amount || ''}&cu=INR`;
  }

  downloadQRCode() {
    const canvas = document.getElementById('qrcodeCanvas')?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png'; // Changed to .png
      link.click();
    }
  }
  downloadOtherQRCode() {
    const canvas = document.getElementById('Otherqr')?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png'; // Changed to .png
      link.click();
    }
  }

  refreshPage() {
    window.location.reload();
  }
}
