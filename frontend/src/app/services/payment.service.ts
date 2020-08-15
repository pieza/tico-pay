import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Recharge to a user.
   * 
   * @param amount amount to recharge.
   */
  recharge(amount: number) {
    return this.http.post(`${environment.apiUrl}/recharge`, { amount }, { headers: this.auth.getHeaders()}).subscribe(
      res => {
        if(res) {
          Swal.fire(
            'Completado!',
            'Recarga exitosa!',
            'success'
          );
          this.auth.current();
        }
      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error || 'Ha ocurrido un error.'
        })
      }
    );
  }

  /**
   * Reduce the balance of an user.
   * 
   * @param identification of the user to charge.
   */
  charge(identification: string) {
    return this.http.post(`${environment.apiUrl}/charge`, { identification }, { headers: this.auth.getHeaders()}).subscribe(
      res => {
        if(res) {
          Swal.fire(
            'Completado!',
            'Cobro exitoso!',
            'success'
          );
        }
      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error || 'Ha ocurrido un error.'
        })
      }
    );
  }
}
