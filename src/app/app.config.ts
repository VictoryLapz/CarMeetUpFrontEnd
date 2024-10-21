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
      domain: 'dev-jm6hvg0klmxse04f.us.auth0.com', //what was in Domain on Auth0
      clientId: 'jJUBaIxYsBitkphghK5yJ8j5An14z8rP', //what was in Client Id on Auth0
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://careventapi", //may need to change later??
        useRefreshTokens: true,
        cacheLocation: "memory"
      }
    })
  ]
};
