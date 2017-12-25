import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, Inject, LOCALE_ID } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';
import { HelperService } from '../helper.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

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
  showTerms: boolean = false;
  acceptTerms: boolean = false;
  isCardValid: boolean = false;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(private userService: UserService,
              private helperService: HelperService,
              private cd: ChangeDetectorRef,
              @Inject(LOCALE_ID) private locale: string) {}
  
  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      this.msgs = [{severity: 'error', summary: '', detail: error.message}];
    } else {
      this.helperService.setSpinner(true);
      this.userService.addCard(this.userService.getUserId(), token.id)
        .subscribe((data:any) => {
          if (data.json()) {
            this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(22, this.locale)}];
            this.helperService.setSpinner(false);
          } else {
            this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(23, this.locale)}];
            this.helperService.setSpinner(false);
          }
        }, (err:any) => {
          this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(23, this.locale)}];
          this.helperService.setSpinner(false);
        });
    }
  }
  
  onChange({ error }) {
    if (error) {
      this.msgs = [{severity: 'error', summary: '', detail: error.message}];
      this.isCardValid = false;
    } else {
      this.msgs.pop();
      this.isCardValid = true;
    }
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    if (this.locale)
      elements = elements = stripe.elements({'locale': this.locale.substring(0, 2)});
    this.card = elements.create('card', {'hidePostalCode': true, 'iconStyle': 'solid'});
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }
  
  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  
  isValid() {
    return this.isCardValid && this.acceptTerms;
  }
  
  showTermsDialog(event: any) {
    event.preventDefault();
    this.showTerms = true;
  }
  
  closeTermsDialog() {
    this.showTerms = false;
  }
}
