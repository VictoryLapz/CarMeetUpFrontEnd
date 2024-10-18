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
export class CreateEventComponent implements OnInit {

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

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventApiService.getAllEvents().subscribe({
      next: (events) => this.events = events,
      error: (err) => console.error(err)
    });
  }

  getEventById(id: number): void {
    this.eventApiService.getEventById(id).subscribe({
      next: (event) => this.selectedEvent = event,
      error: (err) => console.error(err)
    });
  }

  createEvent(): void {
    this.eventApiService.createEvent(this.newEvent).subscribe({
      next: (createdEvent) => {
        this.events.push(createdEvent);
        this.newEvent = { title: '', location: '', date: new Date(), description: '', capacity: 0, carId: 0 };
      },
      error: (err) => console.error(err)
    });
  }

  updateEvent(id: number): void {
    this.eventApiService.updateEvent(id, this.newEvent).subscribe({
      next: (updatedEvent) => {
        const index = this.events.findIndex(event => event.eventId === id);
        if (index !== -1) {
          this.events[index] = updatedEvent;
        }
      },
      error: (err) => console.error(err)
    });
  }

  deleteEvent(id: number): void {
    this.eventApiService.deleteEvent(id).subscribe({
      next: () => {
        this.events = this.events.filter(event => event.eventId !== id);
      },
      error: (err) => console.error(err)
    });
  }

  searchEventsByCarMake(): void {
    this.eventApiService.searchEventsByCarMake(this.searchMake).subscribe({
      next: (events) => this.events = events,
      error: (err) => console.error(err)
    });
  }


}
