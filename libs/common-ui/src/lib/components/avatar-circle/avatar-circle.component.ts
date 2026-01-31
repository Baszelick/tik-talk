import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';

@Component({
  selector: 'app-avatar-circle',
  imports: [ImgUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  profile = input<Profile>();
  avatarUrl = input<string | null>();
}
