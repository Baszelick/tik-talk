import { Component, input } from '@angular/core';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  standalone: true,
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
