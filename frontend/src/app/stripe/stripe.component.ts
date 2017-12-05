import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  // https://alligator.io/angular/stripe-elements/
  card: any;
  cardHandler = this.onChange.bind(this);
  msgs: Message[] = [];
  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}
  
  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      this.msgs = [{severity: 'error', summary: '', detail: error.message}];
    } else {
      this.userService.addCard(this.userService.getUserId(), token.id)
        .subscribe((data:any) => {debugger});
    }
  }
  
  onChange({ error }) {
    if (error) {
      this.msgs = [{severity: 'error', summary: '', detail: error.message}];
    } else {
      this.msgs.pop();
    }
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }
  
  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
}
