import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message } from 'primeng/primeng';

import { UserService } from '../user.service';

import { MessageTranslationPipe } from '../stock/message_translation.pipe';

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
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(@Inject(LOCALE_ID) private locale: string, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
          this.userId = +params.get('userid');
          this.token = params.get('token');
      });
      this.msgs = [{severity: 'info', summary: '', detail: this.messagePipe.transform(17, this.locale)}];
  }
  
  confirm() {
    this.userService.confirm(this.userId, this.token, this.password)
      .subscribe((data:any) => this.msgs = [{severity: 'success', summary: '', detail: this.messagePipe.transform(6, this.locale)}],
      (err:any) => this.msgs = [{severity: 'error', summary: '', detail: this.messagePipe.transform(7, this.locale)}]);
  }

}
