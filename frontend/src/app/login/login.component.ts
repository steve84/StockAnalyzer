import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';
import { HelperService } from '../helper.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

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
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(@Inject(LOCALE_ID) private locale: string,
              private userService: UserService,
              private helperService: HelperService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    
    this.userService.logout();
  }

  login() {
    this.helperService.setSpinner(true);
    this.userService.login(this.username, this.password)
      .subscribe((data:any) => {
        if (data.status == 200 && data.headers.get('Authorization')) {
          localStorage.setItem('token', data.headers.get('Authorization'));
          this.userService.decodeToken();
          this.router.navigateByUrl(this.helperService.getNextUrl() || '/');
          this.helperService.setNextUrl(null);
          this.helperService.setPreviousUrl(null);
          this.helperService.setSpinner(false);
        }
      }, (err:any) => {
        this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(8, this.locale)}];
        this.helperService.setSpinner(false);
      });
  }
}
