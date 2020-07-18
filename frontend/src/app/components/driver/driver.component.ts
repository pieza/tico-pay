import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  routeAssigned;
  idToCharge = new FormControl('', [Validators.required, Validators.maxLength(9)]);

  constructor(private authService : AuthService, private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.authService.user.route
    this.routeAssigned = this.authService.user.route.name;
  }

  chargeUser() {
    this.paymentService.charge(this.idToCharge.value);
  }

  getErrorMessageIdToCharge() {
    if (this.idToCharge.hasError('required')) {
      return 'Ingrese una identificación';
    }
  }

  logout() {
    this.authService.logout();
  }
}
