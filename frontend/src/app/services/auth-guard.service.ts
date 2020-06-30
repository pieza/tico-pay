import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    await this.auth.current()
    
    let role = route.data.role
    
    if (this.auth.user?.type === role) return true

    this.router.navigate(['login'])
    return false
  }
}
