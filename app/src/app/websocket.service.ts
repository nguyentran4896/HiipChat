import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:3000');

    let observable = new Observable(observer => {
      this.socket.on('refreshed messages', (data) => {
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', {
          userCreated: '5bb70e278026100f444ca7ec',
          content: data
        });
      }
    }

    return Rx.Subject.create(observer, observable);
  }
}
