import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
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
