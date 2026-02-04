import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core'; // Adicione importProvidersFrom
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { routes } from './app.routes';
import { environment } from '../environments/environment'; // Importe seu environment

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(
      routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', 
        anchorScrolling: 'enabled'            
      })
    ), 

    provideClientHydration(), 
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),

    importProvidersFrom(RecaptchaModule),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey, 
      } as RecaptchaSettings,
    },
  ]
};