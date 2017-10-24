import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  username: string;
  password: string;
  passwordR: string;
  validCaptcha: boolean = false;
  msgs: Message[] = [];
  
  registerform: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerform = this.fb.group({
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
        this.msgs = [{{severity: 'error', summary: 'Captcha', detail: 'Captcha not valid'}];
      });
    
  }

  onSubmit(value: string) {
    this.userService.register(value)
      .subscribe((data:any) => {
        this.msgs = [{{severity: 'info', summary: 'Registration', detail: 'User registered successfully'}];
      }, (err: any) => {
        this.msgs = [{{severity: 'error', summary: 'Registration', detail: 'Error during user registration'}];
      });
  }
}
