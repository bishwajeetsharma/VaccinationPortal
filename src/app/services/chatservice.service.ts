import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { LoginLogoutService } from './login-logout.service';
import { Chat } from '../model/chat.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChatserviceService {
  stompClient: Stomp.Client;
  role: string;
  id: number;
  newChat = new BehaviorSubject<Chat>(null);
  constructor(
    private http: HttpClient,
    private loginservice: LoginLogoutService
  ) {
    this.loginservice.principal.subscribe((data) => {
      if (data !== null) {
        this.role = data.getRole();
        this.id = data.getId();
      }
    });
  }
  fetchParticipants() {
    console.log('service executing');
    return this.http.get(
      environment.api_config.base_url + 'fetch/' + this.role
    );
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.api_config.base_url + 'websocket');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/broker/' + that.id, function (message) {
        let msg = JSON.parse(message.body);
        let chat = new Chat(
          msg.fromId,
          msg.toId,
          msg.message,
          new Date(msg.date).getTime()
        );
        console.log(chat);
        that.newChat.next(chat);
      });
    });
  }
  sendMessage(chat: Chat) {
    this.stompClient.send('/message', {}, JSON.stringify(chat));
  }
}
