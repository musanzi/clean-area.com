import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PageTitleStrategy } from './page-title.strategy';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducers } from './shared/auth/data-access/auth.reducers';
import * as authEffects from './shared/auth/data-access/auth.effects';
import { httpInterceptor } from './shared/interceptors/http.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled'
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature, withViewTransitions()),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    provideAnimations(),
    provideEffects(authEffects),
    provideStore({
      auth: authReducers
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
};
