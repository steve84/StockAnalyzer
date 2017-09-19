import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

import { CommonTranslationPipe } from '../stock/common_translation.pipe'

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] = [];
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe();
  constructor() { }

  ngOnInit() {
   this.items = [
     {label: this.commonTranslationPipe.transform('Lists'), icon: 'fa-table', items: [
       {label: this.commonTranslationPipe.transform('Stocks'), routerLink: ['/stocks']},
       {label: this.commonTranslationPipe.transform('Indices'), routerLink: ['/indices']}
     ]},
     {label: this.commonTranslationPipe.transform('Stock screener'), icon: 'fa-search', routerLink: ['/stocks/search']},
     {label: this.commonTranslationPipe.transform('Advisor'), icon: ' fa-lightbulb-o', routerLink: ['/combiner']}
   ];
  }

}
