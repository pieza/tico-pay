import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BaseHttpService } from './BaseHttpService';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService<User> {

  constructor(private http: HttpClient, private auth: AuthService) {
    super(http, auth, '/users');
  }
}