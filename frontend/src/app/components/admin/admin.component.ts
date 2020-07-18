import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CreditCard } from 'src/app/models/credit-card';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private routeService: RouteService) { }

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

  routeName = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  routePrice = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  routeProvince = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  routeCanton = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  routeDistrict = new FormControl('', [Validators.required]);

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

  formIsValid2() {
    if (this.routeName.hasError('required')) {
      return false;
    }
    return true;
  }

  register() {
    this.authService.registerAdmin({
      identification: this.username.value,
      type: this.userType,
      name: this.name.value,
      lastname: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      password2: this.password2.value,
      birthday: this.date.value
    });
  }

  registerRoute() {
    this.routeService.create({
      name: this.routeName.value,
      price: this.routePrice.value,
      province: this.routePrice.value,
      district: this.routeDistrict.value,
      canton: this.routeCanton.value
    }).subscribe(response => {
      Swal.fire(
        'Completamente',
        `Ruta registrada corectamente!`,
        'success'
      );
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.error  || 'Ha ocurrido un error.'
      })
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
