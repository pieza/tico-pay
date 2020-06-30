import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoginGuardService as LoginGuard } from './services/login-guard.service'
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { DriverComponent } from './components/driver/driver.component';

const routes: Routes = [
  { path: '', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'register', canActivate: [LoginGuard], component: RegisterComponent },
  { path: 'admin',  canActivate: [AuthGuard], data: { role: 'admin' }, component: AdminComponent },
  { path: 'driver',  canActivate: [AuthGuard], data: { role: 'driver' }, component: DriverComponent },
  { path: 'client',  canActivate: [AuthGuard], data: { role: 'client' }, component: ClientComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
