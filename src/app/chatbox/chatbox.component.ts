import { Component, OnInit } from '@angular/core';
import { ChatAdapter, ChatParticipantStatus, ChatParticipantType, IChatParticipant } from 'ng-chat';
import { MyAdapter } from './my-adapter';
import { LoginLogoutService } from '../services/login-logout.service';
import { ChatserviceService } from '../services/chatservice.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit {
  constructor(
    private loginservice: LoginLogoutService,
    private chatservice:ChatserviceService
  ) {
    setTimeout(()=>{this.pollFriend=false;},3000);
  }
  ngOnInit(): void {
  }
  public title:string="Chat";
  pollFriend:boolean=true;
  public userId: number = this.loginservice.principal.value.getId();
  public adapter:ChatAdapter=new MyAdapter(this.chatservice);
 
}
