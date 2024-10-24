import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

import { EventSignupComponent } from './components/event-signup/event-signup.component';
import { EventManagementComponent } from './components/event-management/event-management.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';


export const routes: Routes = [
  {
    path: '', component: MainPageComponent, // Parent route
    children: [ /* doing this child patern here ensure that the main page goes to every page*/
      {path: 'create-event', component: CreateEventComponent},
      { path: 'event/:id', component: EventDetailsComponent}, /* chid routes go here */
      {path: 'sign-up', component:EventSignupComponent},
      {path: 'manage-event', component:EventManagementComponent},
      {path: 'event-list', component:EventListComponent}
      ]
  }
]

