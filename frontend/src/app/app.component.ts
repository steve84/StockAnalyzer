import { Component } from '@angular/core';

import { Message } from 'primeng/primeng';

import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  msgs: Message[] = [];
  
  constructor(private messageService: MessageService) {
    this.messageService.getMessageEmitter()
      .subscribe((data:Message) => this.msgs = [data]);
  }
}
