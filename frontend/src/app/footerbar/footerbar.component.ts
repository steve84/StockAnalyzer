import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

import { CommonTranslationPipe } from '../stock/common_translation.pipe';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.css']
})
export class FooterbarComponent implements OnInit {
  items: MenuItem[] = [];
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe();
  constructor(@Inject(LOCALE_ID) private locale: String) { }

  ngOnInit() {
    this.items = [
     {label: this.commonTranslationPipe.transform("Impressum", this.locale), routerLink: ['/impressum']},
     {label: this.commonTranslationPipe.transform("Contacts", this.locale), routerLink: ['/contact']},
     {label: this.commonTranslationPipe.transform("FAQ", this.locale), routerLink: ['/faq']}
    ];
  }
  
  getStyle() {
    return {'text-align': 'center'};
  }

}
