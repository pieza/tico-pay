import { Component, OnInit, Inject } from '@angular/core';
import swal from 'sweetalert2'
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CreditCard } from '../models/credit-card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditDialogComponent } from '../credit-dialog/credit-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  username = new FormControl('', [Validators.required, Validators.maxLength(9)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  password2 = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  name = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  date = new FormControl('', [Validators.required]);
  creditCard : CreditCard = null;
  constructor(private authService : AuthService, public dialog: MatDialog) { }


  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'Ingrese una identificación';
    }

    return this.username.hasError('maxlength') ? 'Identificación inválida.' : '';
  }
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Ingrese una contraseña';
    }
  }
  getErrorMessageMail() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email';
    }

    return this.email.hasError('email') ? 'No es un mail válido' : '';
  }
  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Ingrese un nombre';
    }
  }
  getErrorMessageLastName() {
    if (this.name.hasError('required')) {
      return 'Ingrese sus apellidos';
    }
  }
  ngOnInit(): void {
  }

  register() {
    this.authService.register(
      {
        identification:this.username.value,
        name:this.name.value,
        lastname:this.lastName.value,
        email: this.email.value,
        credit_card: this.creditCard,
        password: this.password.value,
        password2: this.password2.value,
        birthday: this.date.value
      }
      );
  }
  formIsValid(){
    console.log(!!this.username.hasError('required'))
    if (this.username.hasError('required') && !this.creditCard){
      return false;
    }
    return true;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreditDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.creditCard = result;
    });

}
}


