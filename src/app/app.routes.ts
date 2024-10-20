import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventManagementComponent } from './components/event-management/event-management.component';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent, // Parent route
    children: [ /* doing this child patern here ensure that the main page goes to every page*/
      { path: 'create-event', component: CreateEventComponent },
      {path: 'manage-event', component:EventManagementComponent} /* chid routes go here */
    ]
  }
]

