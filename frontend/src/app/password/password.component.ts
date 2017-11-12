import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

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
  constructor(private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder) { }

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
  }
  
  resetPwd() {
    this.userService.resetPassword(this.username)
      .subscribe((data:any) => this.msgs = [{severity: 'info', summary: 'Reset', detail: 'Passwort reset successfully'}],
      (err:any) => this.msgs = [{severity: 'error', summary: 'Reset', detail: 'Cannot reset password'}]);
  }
  
  changePwd() {
    this.userService.changePassword(this.userId, this.password, this.passwordNew)
      .subscribe((data:any) => this.msgs = [{severity: 'info', summary: 'Change', detail: 'Passwort changed successfully'}],
      (err:any) => this.msgs = [{severity: 'error', summary: 'Change', detail: 'Cannot change password'}]);
  }

}
