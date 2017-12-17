import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { UserService } from '../user.service';
import { HelperService } from '../helper.service';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private helperService: HelperService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.getUsername() && this.userService.getUsername().length > 0 && tokenNotExpired()) {
      return true;
    }
    else {
      this.userService.logout();
      this.helperService.setPreviousUrl(this.router.url);
      this.helperService.setNextUrl(state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
