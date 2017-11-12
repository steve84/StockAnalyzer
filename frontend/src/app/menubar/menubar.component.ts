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
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe();
  constructor(private userService: UserService, private router: Router, @Inject(LOCALE_ID) private locale: String) { }

  ngOnInit() {
   this.items = [
     {label: this.commonTranslationPipe.transform('Lists', this.locale), icon: 'fa-table', items: [
       {label: this.commonTranslationPipe.transform('Stocks', this.locale), routerLink: ['/stocks']},
       {label: this.commonTranslationPipe.transform('Indices', this.locale), routerLink: ['/indices']}
     ]},
     {label: this.commonTranslationPipe.transform('Stock screener', this.locale), icon: 'fa-search', routerLink: ['/stocks/search']},
     {label: this.commonTranslationPipe.transform('Advisor', this.locale), icon: ' fa-lightbulb-o', routerLink: ['/combiner']}
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
