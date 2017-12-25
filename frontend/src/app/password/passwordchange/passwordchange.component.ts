import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message } from 'primeng/primeng';

import { UserService } from '../../user.service';
import { HelperService} from '../../helper.service';

import { MessageTranslationPipe } from '../../stock/message_translation.pipe';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordChangeComponent implements OnInit {
  password: string;
  passwordNew: string;
  passwordNewR: string;
  userId: number = 0;
  msgs: Message[] = [];
  passwordform: FormGroup;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(@Inject(LOCALE_ID) private locale: string,
              private userService: UserService,
              private helperService: HelperService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.passwordform = this.fb.group({
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'passwordNew': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'passwordNewR': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    
    this.userId = this.userService.getUserId();
  }
  
  changePwd() {
    this.helperService.setSpinner(true);
    this.userService.changePassword(this.userId, this.password, this.passwordNew)
      .subscribe((data:any) => {
        if (data.json())
          this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(11, this.locale)}];
        else
          this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(12, this.locale)}];
        this.helperService.setSpinner(false);
      },
      (err:any) => {
        this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(12, this.locale)}];
        this.helperService.handleError(err);
        this.helperService.setSpinner(false);
      });
  }

}
