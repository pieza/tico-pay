import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

export interface Report1 {
  user: string;
  payment: number;
}
export interface Report2 {
  user: string;
  name: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  amount: number;
  
  displayedColumnsReport1: string[] = ['user', 'payment'];
  displayedColumnsReport2: string[] = ['user', 'name'];

  report1DataSet: Report1[] = [
    {user: '117470491', payment: 2300},
    {user: '117470491', payment: 5},
    {user: '117470491', payment: 2},
    {user: '117470491', payment: 4},
    {user: '117470491', payment: 25},
    {user: '117470491', payment: 15},
  ];
  
  report2DataSet: Report2[] = [
    {user: '117470491', name: 'Marco Morales'},
    {user: '117470491', name: 'Marco Morales'},
    {user: '117470491', name: 'Marco Morales'},
    {user: '117470491', name: 'Marco Morales'},
    {user: '117470491', name: 'Marco Morales'},
    {user: '117470491', name: 'Marco Morales'},
  ];

  resultsLength = 0;
  isLoadingResults = true;

  /** Gets the total cost of all report1DataSet. */
  getTotalCost() {
    return this.report1DataSet.map(t => t.payment).reduce((acc, value) => acc + value, 0);
  }
  getTotal() {
    return this.report2DataSet.map(t => t).reduce((acc, value) => acc + 1, 0);
  }

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
