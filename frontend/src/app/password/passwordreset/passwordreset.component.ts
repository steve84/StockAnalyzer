import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../../user.service';

import { MessageTranslationPipe } from '../../stock/message_translation.pipe';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordResetComponent implements OnInit {
  username: string;
  msgs: Message[] = [];
  resetform: FormGroup;
  action: string;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(@Inject(LOCALE_ID) private locale: string,
              private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.resetform = this.fb.group({
      'username': new FormControl('', Validators.required)
    });
  }
  
  resetPwd() {
    this.userService.resetPassword(this.username)
      .subscribe((data:any) => this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(9, this.locale)}],
      (err:any) => this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(10, this.locale)}]);
  }
}
