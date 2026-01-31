import { Component, input } from '@angular/core';
import { AvatarCircleComponent, LuxonDatePipe } from '@tt/common-ui';
import { LastMessageRes } from '../../../../../../../libs/chats/src/lib/data/interfaces/chats.interface';


@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, LuxonDatePipe, LuxonDatePipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
