import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/user-register';
import { CookieService } from './cookie.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
/**
 * Service to perform auth actions.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private http: HttpClient, private cookie: CookieService,private router: Router) { }

  /**
   * Perform a login on the app and save token.
   *  
   * @param identification identification id or passport of user.
   * @param password       actual passwrd of user.
   */
  login(identification: String, password: String) {
    this.http.post(`${environment.apiUrl}/login`, {
      identification,
      password
    }).subscribe(
      res => {
        console.log(res)
        Swal.fire(
          'Good job!',
          'Inicio de sesion exitoso',
          'success'
        )
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Identificación o contraseña incorrectos'
        })
      }
    );
  }

  /**
   * 
   * @param user user registration data.
   */
  register(user: UserRegister) {
    return this.http.post(`${environment.apiUrl}/signup`, user).subscribe(
      res => {
        console.log(res)
        Swal.fire(
          'Good job!',
          'Registro exitoso',
          'success'
        )
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, revisa los datos ingresados'
        })
      }
    );
  }

  /**
   * Gets the current user logged.
   */
  current() {
    return this.http.get(`${environment.apiUrl}/current`, { headers: this.getHeaders() });
  }

  /**
   * Create a default headers with authorization token.
   */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.cookie.getCookie(environment.cookieId)
    });
  }

  
}
