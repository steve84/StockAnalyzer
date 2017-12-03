import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  password: string;
  passwordNew: string;
  passwordNewR: string;
  username: string;
  userId: number = 0;
  msgs: Message[] = [];
  passwordform: FormGroup;
  resetform: FormGroup;
  action: string;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(@Inject(LOCALE_ID) private locale: string, private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
          this.action = params.get('action');
      });  
    this.passwordform = this.fb.group({
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'passwordNew': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'passwordNewR': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });

    this.resetform = this.fb.group({
      'username': new FormControl('', Validators.required)
    });
    
    this.userId = this.userService.getUserId();
  }
  
  resetPwd() {
    this.userService.resetPassword(this.username)
      .subscribe((data:any) => this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(9, this.locale)}],
      (err:any) => this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(10, this.locale)}]);
  }
  
  changePwd() {
    this.userService.changePassword(this.userId, this.password, this.passwordNew)
      .subscribe((data:any) => this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(11, this.locale)}],
      (err:any) => this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(12, this.locale)}]);
  }

}
