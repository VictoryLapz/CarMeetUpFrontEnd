import { Component, inject } from '@angular/core';
import { EventApiService } from '../../services/event-api.service';
import { EventDetails } from '../../models/event-details';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  eventDetails:EventDetails | null = null;

  eventService = inject(EventApiService);

  ngOnInIt(): { this.loadEvent();
  }
  
