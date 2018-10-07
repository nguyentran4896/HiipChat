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
    this.messages = arr.map(x => {
      x.timeFromNow = this.getTimeFromNow(x.updated || x.created)
      return x
    })
    setTimeout(this.scrollToBottom)
  }

  scrollToBottom() {
    var objDiv = document.getElementById('messages-wrapper')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.setMessages(msg)
    })
  }

  sendMessage(content) {
    if (!content) return
    this.chat.sendMsg(content);
    this.content = ''
  }

  getTimeFromNow(date) {
    let seconds = Date.now() / 1000 - (new Date(date)).getTime() / 1000
  
    let interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + ' ngày trước';
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return interval + ' giờ trước';
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return interval + ' phút trước';
      }
      return (Math.floor(seconds) > 0 ? Math.floor(seconds) : 0) + ' giây trước';
  }
}
