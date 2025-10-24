import {Component, inject} from '@angular/core';
import {ProfileService} from '../../data/services/profile.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-subscribers-page',
  imports: [
    AsyncPipe
  ],
  templateUrl: './subscribers-page.component.html',
  styleUrl: './subscribers-page.component.scss'
})
export class SubscribersPageComponent {

  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getAllSubscribers()

}
