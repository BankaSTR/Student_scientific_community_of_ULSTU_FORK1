import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable Zone.js with optimized change detection
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),

    // Configure the router with in-memory scrolling
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),

    // Enable client hydration for SSR
    provideClientHydration(),

    // Configure HTTP client with fetch
    provideHttpClient(
      withFetch()
    )
  ]
};
