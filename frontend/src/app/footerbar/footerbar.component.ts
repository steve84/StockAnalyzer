import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.css']
})
export class FooterbarComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() { }

  ngOnInit() {
    this.items = [
     {label: "Impressum", routerLink: ['/impressum']},
     {label: "Contacts", routerLink: ['/contact']}
    ];
  }
  
  getStyle() {
    return {'text-align': 'center'};
  }

}
