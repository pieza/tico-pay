import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

export interface Report1 {
  user: string;
  payment: number;
}
export interface Report2 {
  user: string;
  name: string;
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

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

  /** Gets the total cost of all report1DataSet. */
  getTotalCost() {
    return this.report1DataSet.map(t => t.payment).reduce((acc, value) => acc + value, 0);
  }
  getTotal() {
    return this.report2DataSet.map(t => t).reduce((acc, value) => acc + 1, 0);
  }

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  routeAssigned;
  idToCharge = new FormControl('', [Validators.required, Validators.maxLength(9)]);

  constructor(private authService : AuthService, private paymentService : PaymentService) { }

  ngAfterViewInit() {


  }

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

