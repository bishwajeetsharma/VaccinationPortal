import {
  ChatAdapter,
  ChatParticipantStatus,
  ChatParticipantType,
  IChatParticipant,
  Message,
  ParticipantResponse,
} from 'ng-chat';
import { Observable, of, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ChatserviceService } from '../services/chatservice.service';
import { LoginLogoutService } from '../services/login-logout.service';
import {Chat} from '../model/chat.model';
export class MyAdapter extends ChatAdapter {
  chatservice: ChatserviceService;
  constructor(chatservice: ChatserviceService) {
    super();
    this.chatservice = chatservice;
    this.getParticipants(this.chatservice);
     this.chatservice.initializeWebSocketConnection();
  }
  participantlist: IChatParticipant[] = [];
  public static participants: IChatParticipant[] = [];
  getParticipants(chatservice: ChatserviceService) {
    console.log('getPartcipants executing!');
    chatservice.fetchParticipants().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        let participant: IChatParticipant = {
          participantType: ChatParticipantType.User,
          id: data[i]['id'],
          displayName: data[i]['fullname'],
          avatar: null,
          status: ChatParticipantStatus.Online,
        };
        this.participantlist.push(participant);
      }
    });
  }

  listFriends(): Observable<ParticipantResponse[]> {
    console.log('listfriends executing');
    MyAdapter.participants = this.participantlist;
    return of(
      MyAdapter.participants.map((user) => {
        let participantResponse = new ParticipantResponse();
        participantResponse.participant = user;
        participantResponse.metadata = {
          totalUnreadMessages: 0,
        };
        return participantResponse;
      })
    );
  }
  getMessageHistory(destinataryId: any): Observable<Message[]> {
    let mockedHistory: Array<Message>;

    mockedHistory = [
      {
        fromId: 1,
        toId: 999,
        message: "Hi there, just type any message below to test this Angular module.",
        dateSent: new Date()
      }
    ];

    return of(mockedHistory).pipe(delay(2000));
  }
  sendMessage(message: Message): void {
    setTimeout(() => {
      let replyMessage = new Message();

      replyMessage.message =
        'Your query has been forwarded' +
        ' Please wait while we fetch your response! Thank You!';
      replyMessage.dateSent = new Date();
      replyMessage.fromId = message.toId;
      replyMessage.toId = message.fromId;

      let user = MyAdapter.participants.find(
        (x) => x.id == replyMessage.fromId
      );
      let chat=new Chat(message.fromId,message.toId,message.message,new Date(message.dateSent).getTime());
      this.chatservice.sendMessage(chat);
      this.onMessageReceived(user, replyMessage);
      this.newChat();
    }, 1000);
  }

  newChat(){
    this.chatservice.newChat.subscribe(newchat=>{
      if(newchat!==null){
      let user = MyAdapter.participants.find(
        (x) => x.id == newchat.getFromId()
      );
      let message=new Message();
      message.fromId=newchat.getFromId();
      message.toId=newchat.getToId();
      message.message=newchat.getMessage();
      message.dateSent=newchat.getDate();
      this.onMessageReceived(user, message);
    }})
  }
  onMessageReceived(participant: IChatParticipant, message: Message) {
 
  }
}
