import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent, // Parent route
    children: [ /* doing this child patern here ensure that the main page goes to every page*/
      { path: 'create-event', component: CreateEventComponent } /* chid routes go here */
    ]
  }
]

