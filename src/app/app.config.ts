import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importações do Recaptcha
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

// Importações do Cookie Consent
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'faculdadefilos.edu.br' 
  },
  position: 'bottom',
  theme: 'block',
  palette: {
    popup: {
      background: '#0c2d62', 
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#25d366', 
      text: '#0c2d62',       
      border: 'transparent'
    }
  },
  type: 'info', 
  content: {
    message: 'Utilizamos cookies para melhorar sua experiência em nosso portal.',
    dismiss: 'Entendi e Aceito',
    deny: 'Recusar',
    link: 'Política de Privacidade',
    href: '/politica-privacidade', 
    policy: 'Cookies'
  }
};

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

    importProvidersFrom(NgcCookieConsentModule.forRoot(cookieConfig)),
  ]
};