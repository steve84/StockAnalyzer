import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { SelectItem, Message } from 'primeng/primeng';

import { UserService } from '../user.service';
import { HelperService} from '../helper.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;
  languages: SelectItem[];
  msgs: Message[] = [];
  accountform: FormGroup;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(@Inject(LOCALE_ID) private locale: string,
              private userService: UserService,
              private helperService: HelperService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.accountform = this.fb.group({
      'language': new FormControl('', Validators.required)
    });

    this.languages = [
      {label: 'Deutsch', value: 'DE'},
      {label: 'English', value: 'EN'}
    ];

    this.userService.getUserById(this.userService.getUserId()).
      subscribe((data:any) => {
      if (data) {
        debugger
        this.user = data.json();
      }
      }, (err:any) => this.helperService.handleError(err));
  }
  
  onSubmit() {
    this.userService.saveUser(this.user)
      .subscribe((data:any) => {
        if (data) {
          this.user = data.json();
          this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(19, this.locale)}];
        }
      }, (err:any) => {
        this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(20, this.locale)}];
        this.helperService.handleError(err);
      });
  }

}
