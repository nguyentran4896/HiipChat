import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private chat: ChatService, private api: ApiService) {}
  title = 'hiip-chat';

  messages: any[] = []
  content: String = ''
  userName: String = ''
  isLogined: Boolean = false
  userId: String = ''

  setMessages(arr) {
    this.messages = arr.map(x => {
      x.timeFromNow = this.getTimeFromNow(x.updated || x.created)
      return x
    })
    setTimeout(this.scrollToBottom)
  }

  async setUserName(name) {
    this.userName = name || ''
    this.isLogined = true
    setTimeout(this.scrollToBottom)
    let res = await this.api.createUser(name)
    this.userId = res.id
    console.log(res);
  }

  scrollToBottom() {
    var objDiv = document.getElementById('messages-wrapper')
    objDiv.scrollTop = objDiv.scrollHeight
  }


  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.setMessages(msg)
    })
    this.userName = localStorage.getItem('userName') || ''
  }

  sendMessage(content) {
    if (!content) return
    this.chat.sendMsg(JSON.stringify({
      content: content,
      id: this.userId
    }));
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
