import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { UserService } from '../user.service';
import { HelperService } from '../helper.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(private userService: UserService,
              private helperService: HelperService,
              private router: Router,
              @Inject(LOCALE_ID) private locale: string) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    else {
      if (this.userService.getToken() && !tokenNotExpired())
        this.helperService.addGlobalMessage({severity: 'info', summary: '', detail: this.messagePipe.transform(21, this.locale)});
      this.userService.logout();
      this.helperService.setPreviousUrl(this.router.url);
      this.helperService.setNextUrl(state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
