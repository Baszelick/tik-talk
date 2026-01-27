import {Component, inject, Input} from '@angular/core';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';
import { ImgUrlPipe } from '../../../../../common-ui/src/lib/pipes/img-url.pipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {

  router = inject(Router);
  @Input() profile!: Profile;

  async sendMessage(userId: number) {
    await this.router.navigate(['/chats', 'new'], {queryParams: {userId: userId}})
  }
}
