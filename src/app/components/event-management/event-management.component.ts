import { Component, OnInit } from '@angular/core';
import { EventApiService } from '../../services/event-api.service';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event';
import { FormsModule } from '@angular/forms';
import { EventSignUp } from '../../models/event-signup';
import { EventSignupService } from '../../services/event-signup.service';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementComponent implements OnInit {

  events: Event[] = [];
  searchMake: string = '';
  selectedEvent?: Event;
  userId: number = 5;

  constructor(private eventApiService: EventApiService, private eventSignupService: EventSignupService) {}

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
      next: (events) => {
        console.log('Filtered events:', events);
        this.events = events;
      },
      error: (err) => console.error(err)
    });
  }

  // Method to get a random image from the array
  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.randomImageUrls.length);
    return this.randomImageUrls[randomIndex];
  }


  randomImageUrls: string[] = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/300/200?random=2',
    'https://picsum.photos/300/200?random=3',
    'https://picsum.photos/300/200?random=4',
    'https://picsum.photos/300/200?random=5',
    'https://picsum.photos/300/200?random=6',
    'https://picsum.photos/300/200?random=7',
    'https://picsum.photos/300/200?random=8',
    'https://picsum.photos/300/200?random=9',
    'https://picsum.photos/300/200?random=10',
    'https://picsum.photos/300/200?random=11',
    'https://picsum.photos/300/200?random=12',
    'https://picsum.photos/300/200?random=13',
    'https://picsum.photos/300/200?random=14',
    'https://picsum.photos/300/200?random=15',
    'https://picsum.photos/300/200?random=16',
    'https://picsum.photos/300/200?random=17',
    'https://picsum.photos/300/200?random=18',
    'https://picsum.photos/300/200?random=19',
    'https://picsum.photos/300/200?random=20',
    'https://picsum.photos/300/200?random=21',
    'https://picsum.photos/300/200?random=22',
    'https://picsum.photos/300/200?random=23',
    'https://picsum.photos/300/200?random=24',
    'https://picsum.photos/300/200?random=25',
    'https://picsum.photos/300/200?random=26',
    'https://picsum.photos/300/200?random=27',
    'https://picsum.photos/300/200?random=28',
    'https://picsum.photos/300/200?random=29',
    'https://picsum.photos/300/200?random=30'
  ];

  signUpForEvent(event: Event): void {
    const eventSignUp: EventSignUp = {
      userid: this.userId,
      eventid: event.eventId
    };

    this.eventSignupService.createEventSignUp(eventSignUp).subscribe({
      next: () => {
        console.log('Signed up successfully');
      },
      error: (err) => console.error(err)
    });
  }

}
