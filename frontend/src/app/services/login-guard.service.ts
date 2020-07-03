import { Injectable } from '@angular/core'
import { 
  Router,
  CanActivate
} from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.auth.current()

    console.log(this.auth.user)
    if (this.auth.user?.type) {
      this.router.navigate([this.auth.user.type])
      return false
    } else {
      return true
    }
  }
}
