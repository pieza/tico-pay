import { Injectable } from '@angular/core';
import { BaseHttpService } from './BaseHttpService';
import { Route } from '../models/route';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseHttpService<Route> {

  constructor(private http: HttpClient, private auth: AuthService) {
    super(http, auth, '/routes');
  }
}
