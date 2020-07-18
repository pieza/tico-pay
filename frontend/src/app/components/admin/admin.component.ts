import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CreditCard } from 'src/app/models/credit-card';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) { }

  hide = true;
  username = new FormControl('', [Validators.required, Validators.maxLength(9)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  password2 = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  name = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  date = new FormControl('', [Validators.required]);
  userType = 'admin';
  selectedRoute: any;
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

  formIsValid() {
    console.log(!!this.username.hasError('required'))
    if (this.username.hasError('required')) {
      return false;
    }
    return true;
  }

  register() {
    this.authService.registerAdmin({
      identification: this.username.value,
      name: this.name.value,
      lastname: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      password2: this.password2.value,
      birthday: this.date.value
    });
  }

  ngOnInit(): void {
  }

}
