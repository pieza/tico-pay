import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { BaseHttpService } from './BaseHttpService';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseHttpService<Transaction> {

  constructor(private http: HttpClient, private auth: AuthService) {
    super(http, auth, '/transactions');
  }
}
