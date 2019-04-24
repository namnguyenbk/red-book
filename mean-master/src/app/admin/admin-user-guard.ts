import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { TokenStorage } from '../auth/token.storage';
@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  constructor( private token : TokenStorage, private auth : AuthService) {}

  canActivate() {
    if(this.auth.me()){
      return true;
    }
    return false;
  }
}
