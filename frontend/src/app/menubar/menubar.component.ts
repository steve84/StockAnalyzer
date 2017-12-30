import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/primeng';

import { UserService } from '../user.service';

import { CommonTranslationPipe } from '../stock/common_translation.pipe'

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] = [];
  userItems: MenuItem[] = [];
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe('en-US');
  constructor(private userService: UserService, private router: Router, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
   this.items = [
     {label: this.commonTranslationPipe.transform('Home', this.locale), icon: 'fa-home', routerLink: ['/'], routerLinkActiveOptions: {'exact': 'true'}},
     {label: this.commonTranslationPipe.transform('Lists', this.locale), icon: 'fa-table', items: [
       {label: this.commonTranslationPipe.transform('Stocks', this.locale), routerLink: ['/stocks']},
       {label: this.commonTranslationPipe.transform('Indices', this.locale), routerLink: ['/indices']}
     ]},
     {label: this.commonTranslationPipe.transform('Stock screener', this.locale), icon: 'fa-search', routerLink: ['/stocks/search']},
     {label: this.commonTranslationPipe.transform('Advisor', this.locale), icon: 'fa-lightbulb-o', routerLink: ['/combiner']},
     {label: this.commonTranslationPipe.transform('Wizard', this.locale), icon: 'fa-magic', routerLink: ['/wizard']}
   ];

   this.userItems = [
     {label: this.commonTranslationPipe.transform('Profile settings', this.locale), icon: 'fa-address-card-o', routerLink: ['/account']},
     {label: this.commonTranslationPipe.transform('Change Password', this.locale), icon: 'fa-exchange', routerLink: ['/password/change']},
     {label: this.commonTranslationPipe.transform('Logout', this.locale), icon: 'fa-sign-out', command: () => { this.logout(); }}
   ];
  }
  
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  
  login() {
    this.router.navigate(['/login']);
  }
  
  getUsername() {
    return this.userService.getUsername();
  }

}
