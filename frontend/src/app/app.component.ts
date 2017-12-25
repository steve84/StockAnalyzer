import { Component } from '@angular/core';

import { Message } from 'primeng/primeng';

import { MessageService } from './message.service';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  msgs: Message[] = [];
  showSpinner: boolean = false;
  
  constructor(private messageService: MessageService, private helperService: HelperService) {
    this.messageService.getMessageEmitter()
      .subscribe((data:Message) => this.msgs = [data]);
    
    this.helperService.getSpinnerEmitter()
      .subscribe((data:boolean) => {
        if (this.showSpinner != data)
          this.showSpinner = data;
      });
  }
}
