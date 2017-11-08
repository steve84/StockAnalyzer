import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  password: string;
  userId: number;
  token: string;
  msgs: Message[] = [];
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
          this.userId = +params.get('userid');
          this.token = params.get('token');
      });
  }
  
  confirm() {
    this.userService.confirm(this.userId, this.token, this.password)
      .subscribe((data:any) => this.msgs = [{severity: 'info', summary: 'Success', detail: 'Account confirmed successfully'}],
      (err:any) => this.msgs = [{severity: 'error', summary: 'Error', detail: 'Cannot confirm account'}]);
  }

}
