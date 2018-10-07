import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hiip-chat';

  messages: any[] = []
  content: String = ''

  setMessages(arr) {
    this.messages = arr
  }

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log('msg', msg);
      
      this.setMessages(msg)
    })
  }

  sendMessage(content) {
    if (!content) return
    this.chat.sendMsg(content);
  }
}
