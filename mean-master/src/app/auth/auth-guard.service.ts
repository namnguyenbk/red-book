import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router,
    private auth : AuthService) {}

    canActivate() {
      if(localStorage.getItem('AuthToken')){
        return true;
      }
      this.router.navigate(['/auth/login']);
      return false;
  }
}
