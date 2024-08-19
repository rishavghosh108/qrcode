import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.css']
})
export class UpiComponent {
  @Output() name = new EventEmitter<string>();
  @Output() upi = new EventEmitter<string>();
  @Output() amount = new EventEmitter<number>();

  nameValue: string = '';
  upiValue: string = '';
  amountValue: number = 0;

  qr_state: boolean=false;

  name_error: boolean=false;
  upi_error: boolean=false;
  amount_error: boolean=false

  Transaction = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+ [a-zA-Z]+$/)]),
    upi: new FormControl('',[Validators.required, Validators.pattern(/^[\w.-]+@[a-zA-Z]{2,}$/)]),
    amount: new FormControl('', [Validators.pattern(/^[0-9]+$/)])
  })

  Name_err(){
    this.name_error=false
  }
  Upi_err(){
    this.upi_error=false
  }
  Amount_err(){
    this.amount_error=false
  }

  refreshPage() {
    window.location.reload();
  }

  onSubmit(): void {
    if(this.Transaction.valid){
      this.nameValue = this.Transaction.get('name')?.value || '';
      this.upiValue = this.Transaction.get('upi')?.value || '';
      const amountValue = this.Transaction.get('amount')?.value;
      this.amountValue = amountValue ? parseFloat(amountValue) : 0;

      this.qr_state = !this.qr_state;

      // Emit the values
      this.name.emit(this.nameValue);
      this.upi.emit(this.upiValue);
      this.amount.emit(this.amountValue);
    }else{
      console.log(this.Transaction.get('name')?.valid)
      this.name_error=this.Transaction.get('name')?.valid ? false : true ;
      this.upi_error=this.Transaction.get('upi')?.valid ? false : true ;
      this.amount_error=this.Transaction.get('amount')?.valid ? false : true ;
    }
  }

}
