import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])),
    //This information comes from the auth0 dashboard
    //You'll have to fill it out for yourself.
    provideAuth0({
      domain: 'dev-5w5l8ake23bk7o4h.us.auth0.com',
      clientId: 'EpZ1q9guhNdJjFNexQtARR6H7fiajkqD',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://recipe-api.com",
        useRefreshTokens: true,
        cacheLocation: "memory"
      }
    })
  ]
};
