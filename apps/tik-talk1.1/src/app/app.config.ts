import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from '../../../../libs/auth/src/lib/auth/auth.interceptor';
import {provideStore, provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {postFeature, PostEffects} from '@tt/posts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideState(postFeature),
    provideEffects(PostEffects)
  ],
};
