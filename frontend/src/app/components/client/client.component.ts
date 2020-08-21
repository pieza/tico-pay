import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Transaction, TransactionTypes } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  amount: number;
  
  displayedColumnsReport1: string[] = ['user', 'amount'];
  displayedColumnsReport2: string[] = ['route', 'date'];

  report1DataSet: Transaction[] = [];
  
  report2DataSet: Transaction[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  /** Gets the total cost of all report1DataSet. */
  getTotalCost() {
    return this.report1DataSet.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }
  getTotal() {
    return this.report2DataSet.length;
  }

  getReport1() {
    this.transactionService.find({ type: TransactionTypes.RECHARGE, user: this.auth.user._id }).subscribe(data => {
      this.report1DataSet = data;
    })
  }

  getReport2() {
    this.transactionService.find({ type: TransactionTypes.CHARGE, user: this.auth.user._id }).subscribe(data => {
      this.report2DataSet = data;
    })
  }

  constructor(public auth: AuthService, private payment: PaymentService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getReport1()
    this.getReport2()
  }

  submit() {
    this.payment.recharge(this.amount);
  }

  logout() {
    this.auth.logout();
  }

}
