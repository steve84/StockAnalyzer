import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }
  
  canActivate() {
    if (this.userService.getUsername() && this.userService.getUsername().length > 0) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
