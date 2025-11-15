import { Component, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {of, switchMap} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {ChatWorkspaceHeaderComponent} from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ChatsService } from '../../../data';

@Component({
  selector: 'app-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);

  activeChat$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          switchMap(({userId}) => {
            return this.chatsService.createChat(userId).pipe(
              switchMap(chat => {
                this.router.navigate(['chats', chat.id])
                return of(null)
              })
            )
          })
        )
      }
      return this.chatsService.getChatById(id)
    })
  )
}
