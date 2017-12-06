import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { UserService } from '../user.service';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }
  
  canActivate() {
    if (this.userService.getUsername() && this.userService.getUsername().length > 0 && tokenNotExpired()) {
      return true;
    }
    else {
      this.userService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }

}
