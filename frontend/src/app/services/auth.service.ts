import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/user-register';
import { CookieService } from './cookie.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { User } from '../models/user';
/**
 * Service to perform auth actions.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  user: User
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
      (res:any) => {
        this.cookie.createCookie(environment.cookieId, res.token);
        // TODO: add loading 
        this.current().then((user: User) => {
          this.router.navigateByUrl(user.type);
          Swal.fire(
            'Inicio de sesion exitoso!',
            `Bienvenido ${user.name}!`,
            'success'
          );
        });
      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error || 'Identificación o contraseña incorrectos'
        })
      }
    );
  }

  /**
   * Performs a logout of the application.
   */
  logout() {
    this.http.get(`${environment.apiUrl}/logout`).subscribe(
      (res:any) => {
        this.cookie.deleteCookie(environment.cookieId);
        this.router.navigateByUrl('login');
      },
      err => {
        this.cookie.deleteCookie(environment.cookieId);
        this.router.navigateByUrl('login');
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
          'Completado!',
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
          text: err.error || 'Ocurrio un error, revisa los datos ingresados'
        })
      }
    );
  }

  /**
   * 
   * @param user user registration data.
   */
  registerAdmin(user: UserRegister) {
    return this.http.post(`${environment.apiUrl}/signupAdmin`, user, this.getHeaders()).subscribe(
      res => {
        console.log(res)
        Swal.fire(
          'Completado!',
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
          text: err.error || 'Ocurrio un error, revisa los datos ingresados'
        })
      }
    );
  }

  /**
   * Gets the current user logged.
   */
  current() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.apiUrl}/current`, this.getHeaders()).subscribe((data: any) => {
        this.user = data ? data : null;
        resolve(this.user);
      }, error => {
        this.user = null;
        resolve(this.user);
      });
    });
    
  }

  /**
   * Create a default headers with authorization token.
   */
  getHeaders(): any {
    return { headers: new HttpHeaders({
      Authorization: this.cookie.getCookie(environment.cookieId)
    })};
  }

  
}
