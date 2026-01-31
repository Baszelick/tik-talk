import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {ChatsService} from '@tt/chats';
import {ProfileHeaderComponent} from '../../ui';
import { ProfileService } from '../../data';
import {PostFeedComponent} from '@tt/posts';




@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  chatsService = inject(ChatsService);
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  subscribers$ = this.profileService.getSubscribersShortList(5);

  me$ = toObservable(this.profileService.me);

  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    await this.router.navigate(['/chats', 'new'], {queryParams: {userId: userId}})
  }
}
