import { Component, OnInit } from '@angular/core';
import { EventApiService } from '../../services/event-api.service';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementComponent implements OnInit {

  events: Event[] = [];
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

  updateEvent(id: number, updatedEvent: Event): void {
    this.eventApiService.updateEvent(id, updatedEvent).subscribe({
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
