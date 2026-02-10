import {Component, HostBinding, inject} from '@angular/core';
import {ProfileCardComponent} from '../../ui';
import {profileActions, selectFilteredProfiles} from '../../data';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {Store} from '@ngrx/store';
import {InfiniteScrollComponent} from "@tt/common-ui";


@Component({
  selector: 'app-search-page',
  host: {class: 'custom-scrollbar'},
  imports: [ProfileCardComponent, ProfileFiltersComponent, InfiniteScrollComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles)

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }

}
