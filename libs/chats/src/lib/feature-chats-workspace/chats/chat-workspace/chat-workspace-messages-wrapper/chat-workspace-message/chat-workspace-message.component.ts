import { Component, HostBinding, input } from '@angular/core';
import { Messages } from '../../../../../../../../../libs/chats/src/lib/data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Messages>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
