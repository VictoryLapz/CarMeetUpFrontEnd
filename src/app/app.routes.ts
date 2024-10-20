import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventSignupComponent } from './components/event-signup/event-signup.component';
import { EventListComponent } from './components/event-list/event-list.component';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent, // Parent route
    children: [ /* doing this child patern here ensure that the main page goes to every page*/
      { path: 'create-event', component: CreateEventComponent } /* chid routes go here */,
      { path: 'event-list', component: EventListComponent},
        {path: 'event/id', component:EventDetailsComponent}, 
        {path: 'sign-up', component:EventSignupComponent},]
  }
]

