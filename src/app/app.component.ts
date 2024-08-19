import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() qrurl = new EventEmitter<string>();
  urlValue: string ="";

  upi_state: boolean = false;
  qr_state: boolean = false;
  webqr_state: boolean = false;
  textqr_state: boolean = false;
  textqr_error: boolean = false;
  url_error: boolean = false;

  // Reactive Form for URL input
  UrlForm = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/
      ),
    ]),
  });
  
  // Toggles UPI state
  UpiState() {
    this.upi_state = !this.upi_state;
  }

  // Toggles Web QR state
  WebQr() {
    this.webqr_state = !this.webqr_state;
  }
  TextQr(){
    this.textqr_state=!this.textqr_state;
  }

  // Handles form submission
  onSubmit() {
    if (this.UrlForm.invalid) {
      this.url_error = true;
    } else {
      this.url_error = false;
      this.urlValue = this.UrlForm.get('url')?.value || ''; // Default to an empty string if value is null/undefined
      this.qrurl.emit(this.urlValue); // Emit the URL value
      this.qr_state=true;
    }
  }

  TextForm = new FormGroup({ text: new FormControl('', Validators.required)});
  onTextSubmit(){
    if(this.TextForm.invalid){
      this.textqr_error=true;
    }else{
      this.textqr_error=false;
      this.urlValue = this.TextForm.get('text')?.value || '';
      this.qrurl.emit(this.urlValue)
      this.qr_state=true;
    }
  }

}