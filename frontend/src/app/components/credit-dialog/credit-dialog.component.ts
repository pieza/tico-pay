import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../register/register.component';
import { Validators, FormControl } from '@angular/forms';
import { CreditCard } from '../../models/credit-card';

@Component({
  selector: 'app-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.scss']
})
export class CreditDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreditCard) {
      data.CVV = this.CVV.value;
      data.expiration_month = this.exp_month.value;
      data.expiration_year = this.exp_year.value;
      data.number = this.cardNumber.value;
    }

    cardNumber = new FormControl('', [Validators.required, Validators.maxLength(9)]);
    CVV = new FormControl('', [Validators.required, Validators.maxLength(3)]);
    exp_month = new FormControl('', [Validators.required, Validators.maxLength(2)]);
    exp_year = new FormControl('', [Validators.required, Validators.maxLength(2)]);

    onNoClick(): void {
      this.dialogRef.close();
    }
    setParams(){
      this.data.CVV = this.CVV.value;
      this.data.expiration_month = this.exp_month.value;
      this.data.expiration_year = this.exp_year.value;
      this.data.number = this.cardNumber.value;
    }
  ngOnInit(): void {
  }
  getErrorMessageCardNumber() {
    if (this.cardNumber.hasError('required')) {
      return 'Ingrese el número de tarjeta';
    }
  }
  getErrorMessageCVV() {
    if (this.CVV.hasError('required')) {
      return 'Ingrese el número de seguridad';
    }
  }

  getErrorMessageExp_month() {
    if (this.CVV.hasError('required')) {
      return 'Ingrese el mes';
    }
  }
  getErrorMessageExp_year() {
    if (this.CVV.hasError('required')) {
      return 'Ingrese el año';
    }
  }
  formIsValid(){
    if (this.exp_year.hasError('required') && this.exp_month.hasError('required') && this.cardNumber.hasError('required') && this.CVV.hasError('required'))
    return false;
    return true;
  }
}