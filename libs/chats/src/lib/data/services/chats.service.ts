import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, GlobalStoreService } from '@tt/shared';
import { Chat, LastMessageRes, Messages } from '../interfaces/chats.interface';
import {map, Observable} from 'rxjs';
import {ChatWsService} from '../interfaces/chat-ws-service.interface';
import {AuthService} from '@tt/auth';
import {ChatWsMessage} from '../interfaces/chat-ws-message.interface';
import {isNewMessage, isUnreadMessage} from '../interfaces/type-guard';
import {ChatWsRxjsService} from '../interfaces/chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(GlobalStoreService).me;
  #authService = inject(AuthService);

  wsAdapter: ChatWsService = new ChatWsRxjsService()

  baseApiUrl = API_URL;
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;
  activeChatMessages = signal<Messages[]>([]);

  connectWs() {
    return this.wsAdapter.connect({
      url: `${this.chatsUrl}ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWsMessage
    }) as Observable<ChatWsMessage>;
  }
    //TODO замыкание
  handleWsMessage = (message: ChatWsMessage)=> {
    if(!('action' in message)) return

    if(isUnreadMessage(message)) {
      //TODO
    }

    if(isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          text: message.data.message,
          personalChatId: message.data.chat_id,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,

        }
      ])
    }
    console.log(message);
  }

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });
        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: { message },
      }
    );
  }
}
