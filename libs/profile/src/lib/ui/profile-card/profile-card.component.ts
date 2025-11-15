import { Component, Input } from '@angular/core';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';
import { ImgUrlPipe } from '../../../../../common-ui/src/lib/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
