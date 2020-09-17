import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthTokenService, public router: Router) {}
  canActivate(): boolean {
    console.log(this.auth.isAuthenticated())
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
