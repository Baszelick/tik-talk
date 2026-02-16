import { Routes } from '@angular/router';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent
} from '@tt/profile';
import {canActivateAuth, LoginPageComponent} from '@tt/auth';
import {LayoutComponent} from '@tt/layout';
import {chatsRoutes} from '@tt/chats';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {
  FormsExperimentalComponent
} from "../../../../libs/experemental/src/lib/experemental/forms-experemental/forms-experemental.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'experimental', component: FormsExperimentalComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
