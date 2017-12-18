import { Injectable, EventEmitter } from '@angular/core';

import { Message } from 'primeng/primeng';

@Injectable()
export class MessageService {
  msgEmitter: EventEmitter<Message> = new EventEmitter<Message>();
  constructor() { }
  
  getMessageEmitter() {
    return this.msgEmitter;
  }
  
  addMessage(msg: Message) {
    this.msgEmitter.emit(msg);
  }

}
