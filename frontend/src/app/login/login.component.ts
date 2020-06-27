import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  username = new FormControl('', [Validators.required, Validators.maxLength(9)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username.value, this.password.value);
  }

  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'Ingrese una identificación';
    }

    return this.username.hasError('maxlength') ? 'La identificación no puede contener mas de 9 caracteres.' : '';
  }

}
