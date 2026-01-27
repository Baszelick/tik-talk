import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../../../../../../libs/chats/src/lib/data/services/chats.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtnComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent implements OnInit {
  filterChatsControl = new FormControl('');

  chatsService = inject(ChatsService);

  filterValue = toSignal(
    this.filterChatsControl.valueChanges.pipe(startWith('')),
    { initialValue: '' }
  );

  filteredChats = computed(() => {
    const allChats = this.chatsService.unreadMessageById();
    const query = this.filterValue()?.toLowerCase() ?? '';

    return allChats.filter((c) =>
      `${c.userFrom.firstName} ${c.userFrom.lastName}`
        .toLowerCase()
        .includes(query)
    );
  });

  ngOnInit() {
    this.chatsService.getMyChats().subscribe();
  }

  // chats$ = this.chatsService.getMyChats().pipe(
  //   switchMap((chats) => {
  //     return this.filterChatsControl.valueChanges.pipe(
  //       startWith(''),
  //       map((inputValue) => {
  //         return chats.filter((chat) => {
  //           return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
  //             .toLowerCase()
  //             .includes((inputValue || '').toLowerCase());
  //         });
  //       })
  //     );
  //   })
  // );
}
