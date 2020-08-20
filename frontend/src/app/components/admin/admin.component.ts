import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CreditCard } from 'src/app/models/credit-card';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';
import { Route } from 'src/app/models/route';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private routeService: RouteService, private userService: UserService) { }

  shouldShowEditUser = false;
  shouldShowEditRoute = false;

  hide = true;
  username = new FormControl('', [Validators.required, Validators.maxLength(9)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  password2 = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  name = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  date = new FormControl('', [Validators.required]);
  userType = 'admin';
  userId = '';
  selectedRoute: any;
  routesDriver: Route[] = [];

  hideEdit = true;
  usernameEdit = new FormControl('', [Validators.required, Validators.maxLength(9)]);
  passwordEdit = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  password2Edit = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  nameEdit = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  lastNameEdit = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  emailEdit = new FormControl('', [Validators.required, Validators.email]);
  dateEdit = new FormControl('', [Validators.required]);
  userTypeEdit = 'admin';
  selectedRouteEdit: Route;

  usernameDisable = new FormControl('', [Validators.required, Validators.maxLength(9)]);

// Routes

routeName = new FormControl('', [Validators.required, Validators.maxLength(10)]);
routePrice = new FormControl('', [Validators.required, Validators.maxLength(10)]);
routeProvince = new FormControl('', [Validators.required, Validators.maxLength(100)]);
routeCanton = new FormControl('', [Validators.required, Validators.maxLength(100)]);
routeDistrict = new FormControl('', [Validators.required]);

routeNameEdit = new FormControl('', [Validators.required, Validators.maxLength(10)]);
routePriceEdit = new FormControl('', [Validators.required, Validators.maxLength(10)]);
routeProvinceEdit = new FormControl('', [Validators.required, Validators.maxLength(100)]);
routeCantonEdit = new FormControl('', [Validators.required, Validators.maxLength(100)]);
routeDistrictEdit = new FormControl('', [Validators.required]);

routeNameDisable = new FormControl('', [Validators.required, Validators.maxLength(10)]);

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
  formEditIsValid() {
    console.log(!!this.usernameEdit.hasError('required'))
    if (this.usernameEdit.hasError('required')) {
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
  formEditIsValid2() {
    if (this.routeNameEdit.hasError('required')) {
      return false;
    }
    return true;
  }
  register() {
    this.authService.registerAdmin({
      identification: this.username.value,
      type: this.userType,
      route: this.selectedRoute,
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
  editRoute() {
    /*
    this.routeService.edit({
      name: this.routeNameEdit.value,
      price: this.routePriceEdit.value,
      province: this.routePriceEdit.value,
      district: this.routeDistrictEdit.value,
      canton: this.routeCantonEdit.value
    }).subscribe(response => {
      Swal.fire(
        'Completamente',
        `Ruta editada corectamente!`,
        'success'
      );
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.error  || 'Ha ocurrido un error.'
      })
    });
    */
  }
  editUser() {
    //TODO QA
    this.userService.update(this.userId, { 
      identification: this.usernameEdit.value,
      type: this.userTypeEdit,
      route: this.selectedRouteEdit,
      name: this.nameEdit.value,
      lastname: this.lastNameEdit.value,
      email: this.emailEdit.value,
      password: this.passwordEdit.value,
      birthday: this.dateEdit.value
    }).subscribe(response => {
      Swal.fire(
        'Completamente',
        `Usuario editado corectamente!`,
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
  getUserById() {
    //TODO QA
    this.userService.find({ identification: this.usernameEdit.value }).subscribe((data: User[]) => {
      const user = data[0]
      this.usernameEdit.setValue(user.identification) 
      this.userTypeEdit = user.type
      this.selectedRouteEdit = user.route
      this.nameEdit.setValue(user.name)
      this.lastNameEdit.setValue(user.lastname)
      this.emailEdit.setValue(user.email)
      this.passwordEdit.setValue(user.password) 
      this.dateEdit.setValue(user.birthday)
      this.shouldShowEditUser = true;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.error?.error  || 'Usuario no encontrado.'
      })
    })
  }

  getRouteByName() {
    //TODO QA search route By id
    this.routeService.find({ name: this.routeNameEdit.value }).subscribe(data => {
      const route = data[0]
      this.routeNameEdit.setValue(route.name)
      this.routePriceEdit.setValue(route.price)
      this.routeProvince.setValue(route.province) 
      this.routeDistrictEdit.setValue(route.district) 
      this.routeCantonEdit.setValue(route.canton)
      this.shouldShowEditRoute = true;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.error?.error  || 'Ruta no encontrada'
      })
    })
  }

  async disableUser () {
    //TODO QA CALL disable using variable this.usernameDisable
    const user = (await this.userService.find({ identification: this.usernameDisable }).toPromise())[0]
    user.active = false
    this.userService.update(user._id, user)
    .subscribe(response => {
      Swal.fire(
        'Completamente',
        `Usuario desactivado corectamente!`,
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
  async disableRoute() {
    //TODO QA CALL disable using variable this.routeNameDisable
    const route = (await this.routeService.find().toPromise())[0]

    this.routeService.delete(route._id)
    .subscribe(response => {
      Swal.fire(
        'Completamente',
        `Ruta eliminada corectamente!`,
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
  getRoutes() {
    this.routeService.find().subscribe(response => {
      console.log(response)
      this.routesDriver = response;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.error  || 'Ha ocurrido un error.'
      })
    })
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.getRoutes();
  }

}
