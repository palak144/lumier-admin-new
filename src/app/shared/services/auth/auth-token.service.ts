import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthTokenService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
  let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    
    return jwtHelper.isTokenExpired(token);
  }
}
