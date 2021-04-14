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
import { Chat } from '../model/chat.model';
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
    let ownid = this.chatservice.fetchParticipants().subscribe((data: any) => {
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
    let mockedHistory: Message[] = [];
    this.chatservice
      .fetchMessageHistory(destinataryId)
      .subscribe((data: any) => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          let message = new Message();
          message.fromId = data[i]['fromId'];
          message.toId = data[i]['toId'];
          message.message = data[i]['message'];
          message.dateSent = new Date(data[i]['date']);
          mockedHistory.push(message);
        }
      });
    return of(mockedHistory).pipe(delay(2000));
  }
  sendMessage(message: Message): void {
    setTimeout(() => {
    
      let user = MyAdapter.participants.find(
        (x) => x.id == message.toId
      );
      let chat = new Chat(
        message.fromId,
        message.toId,
        message.message,
        new Date(message.dateSent).getTime()
      );
      this.chatservice.sendMessage(chat);
    }, 1000);
  }
  onMessageReceived(participant: IChatParticipant, message: Message) {}
}
