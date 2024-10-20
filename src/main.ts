import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideAuth0({
      domain: 'dev-jm6hvg0klmxse04f.us.auth0.com',
      clientId: 'jJUBaIxYsBitkphghK5yJ8j5An14z8rP',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    ...(appConfig.providers || [])  
  ]
}).catch((err) => console.error(err));
