import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../../user.service';
import { HelperService } from '../../helper.service';

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
              private helperService: HelperService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.resetform = this.fb.group({
      'username': new FormControl('', Validators.required)
    });
  }
  
  resetPwd() {
    this.helperService.setSpinner(true);
    this.userService.resetPassword(this.username)
      .subscribe((data:any) => {
        if (data.json())
          this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(9, this.locale)}];
        else
          this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(10, this.locale)}];
        this.helperService.setSpinner(false);
      },
      (err:any) => {
        this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(10, this.locale)}];
        this.helperService.setSpinner(false);
      });
  }
}
