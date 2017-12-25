import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';
import { HelperService } from '../helper.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  email: string;
  username: string;
  password: string;
  passwordR: string;
  validCaptcha: boolean = false;
  existingUsername: boolean = false;
  msgs: Message[] = [];
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  
  registerform: FormGroup;
  constructor(@Inject(LOCALE_ID) private locale: string,
              private userService: UserService,
              private helperService: HelperService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.registerform = this.fb.group({
      'email': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'passwordR': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }
  
  showResponse(event: any) {
    this.userService.validateCaptcha(event.response)
      .subscribe((data:any) => {
        this.validCaptcha = true; 
      }, (err: any) => {
        this.validCaptcha = false;
        this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(13, this.locale)}];
      });
    
  }

  onSubmit(value: string) {
    this.helperService.setSpinner(true);
    this.userService.register(value)
      .subscribe((data:any) => {
        this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(14, this.locale)}];
        this.helperService.setSpinner(false);
      }, (err: any) => {
        this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(15, this.locale)}];
        this.helperService.setSpinner(false);
      });
  }
  
  checkUsername() {
    this.existingUsername = true;
    this.userService.checkUsername(this.username)
      .subscribe((data:any) => {
        if (data && data.json()) {
          this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(16, this.locale)}];
        } else {
          this.existingUsername = false;
          this.msgs.pop();
        }
      });
  }
}
