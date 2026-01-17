import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from './chats-list/chats-list.component';
import {ChatsService} from '@tt/chats';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent implements OnInit {
  #chatService = inject(ChatsService);

  ngOnInit() {
    this.#chatService.connectWs().subscribe()
  }
}
