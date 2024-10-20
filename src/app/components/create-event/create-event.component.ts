import { Component, OnInit } from '@angular/core';
import { EventApiService } from '../../services/event-api.service';
import { Event } from '../../models/event';
import { EventDto } from '../../models/event-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  events: Event[] = [];
  newEvent: EventDto = {
    title: '',
    location: '',
    date: new Date(),
    description: '',
    capacity: 0,
    carId: 0
  };
  searchMake: string = '';
  selectedEvent?: Event;
  constructor(private eventApiService: EventApiService) {}

  createEvent(): void {
    this.eventApiService.createEvent(this.newEvent).subscribe({
      next: (createdEvent) => {
        this.events.push(createdEvent);
        this.newEvent = { title: '', location: '', date: new Date(), description: '', capacity: 0, carId: 0 };
      },
      error: (err) => console.error(err)
    });
  }

}
