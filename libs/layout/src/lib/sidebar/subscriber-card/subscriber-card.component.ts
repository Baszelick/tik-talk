import { Component, Input } from '@angular/core';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';
import { ImgUrlPipe } from '../../../../../common-ui/src/lib/pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
