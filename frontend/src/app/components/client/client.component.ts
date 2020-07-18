import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  amount: number;
  
  constructor(public auth: AuthService, private payment: PaymentService) { }

  ngOnInit(): void {
  }

  submit() {
    this.payment.recharge(this.amount);
  }

  logout() {
    this.auth.logout();
  }

}
