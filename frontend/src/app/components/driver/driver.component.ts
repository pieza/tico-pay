import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Transaction, TransactionTypes } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { Route } from 'src/app/models/route';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  displayedColumnsReport1: string[] = ['user', 'amount'];
  displayedColumnsReport2: string[] = ['user', 'name'];

  report1DataSet: Transaction[] = [];
  
  report2DataSet: Transaction[] = [];

  /** Gets the total cost of all report1DataSet. */
  getTotalCost() {
    return this.report1DataSet.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }
  getTotal() {
    return this.report2DataSet.length;
  }

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  routeAssigned: Route;
  idToCharge = new FormControl('', [Validators.required, Validators.maxLength(9)]);

  constructor(private authService : AuthService, private paymentService : PaymentService, private transactionService: TransactionService) { }

  ngAfterViewInit() {


  }

  getReport1() {
    this.transactionService.find({ type: TransactionTypes.CHARGE, route: this.routeAssigned._id }).subscribe(data => {
      this.report1DataSet = data;
    })
  }

  getReport2() {
    this.transactionService.find({ type: TransactionTypes.DENIED }).subscribe(data => {
      this.report2DataSet = data;
    })
  }

  ngOnInit(): void {
    this.routeAssigned = this.authService.user.route;
    this.getReport1();
    this.getReport2();
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

