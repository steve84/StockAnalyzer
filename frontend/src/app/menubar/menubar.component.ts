import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  private items: MenuItem[] = [];
  constructor() { }

  ngOnInit() {
   this.items = [
     {label: 'Listen', icon: 'fa-table', items: [
       {label: 'Aktien', routerLink: ['/stocks']},
       {label: 'Indizes', routerLink: ['/indices']}
     ]},
     {label: 'Aktien-Suche', icon: 'fa-search', routerLink: ['/stocks/search']},
     {label: 'Advisor', icon: ' fa-lightbulb-o', routerLink: ['/combiner']}
   ];
  }

}
