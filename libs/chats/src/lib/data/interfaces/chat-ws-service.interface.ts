import {ChatWsMessage} from './chat-ws-message.interface';
import {Observable} from 'rxjs';

export interface ChatConnectionWsParams {
  url: string
  token: string
  handleMessage: (message: ChatWsMessage) => void
}

export interface ChatWsService {
  connect: (params: ChatConnectionWsParams) => void | Observable<ChatWsMessage>;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
