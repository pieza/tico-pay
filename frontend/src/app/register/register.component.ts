import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  username = new FormControl('', [Validators.required, Validators.maxLength(9)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  name = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService : AuthService) { }

  login() {
    this.authService.login(this.username.value, this.password.value);
  }

  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'Ingrese una identificación';
    }

    return this.username.hasError('maxlength') ? 'La identificación no puede contener mas de 9 caracteres.' : '';
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
      return 'Ingrese un nombre';
    }
  }
  ngOnInit(): void {
  }

  register() {
    console.log("clock")
    swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

}
