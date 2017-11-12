import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = 'Login';
  username: string;
  password: string;
  msgs: Message[] = [];
  loginform: FormGroup;
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((data:any) => {
        debugger
        if (data.status == 200 && data.headers.get('Authorization')) {
          localStorage.setItem('token', data.headers.get('Authorization'));
          this.userService.decodeToken();
          this.router.navigate(['/']);
        }
      }, (err:any) => this.msgs = [{severity: 'error', summary: 'Error', detail: 'Username or password not correct'}]);
  }
}
