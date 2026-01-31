import { Component, inject, input } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';

import { firstValueFrom } from 'rxjs';
import { MessageInputComponent } from '../../../../ui';
import { Chat, ChatsService } from '../../../../data';


@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatService = inject(ChatsService);

  chat = input.required<Chat>();
  messages = this.chatService.activeChatMessages;

  groups = this.chatService.groupedMessages

  async onSendMessage(messageText: string) {
    this.chatService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    )
    // await firstValueFrom(
    //   this.chatService.sendMessage(this.chat().id, messageText)
    // );

    await firstValueFrom(this.chatService.getChatById(this.chat().id));
  }
}
