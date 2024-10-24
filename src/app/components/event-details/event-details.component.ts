import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventApiService } from '../../services/event-api.service';
import { Event } from '../../models/event';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EventSignupService } from '../../services/event-signup.service';
import { EventSignupComponent } from '../event-signup/event-signup.component';
import { EventListComponent } from '../event-list/event-list.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, EventSignupComponent,EventListComponent],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventService = inject(EventApiService);
  eventSignup = inject(EventSignupService);
  event: Event | null = null;
  errorMessage: string = '';
  userId: number = 1;
  

  constructor(private route: ActivatedRoute, private eventapiservice: EventApiService) {}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Raw Event ID:', idParam); // Log raw ID param
    if (idParam) {
      const id = +idParam; // Convert to number
      console.log('Converted Event ID:', id); // Log converted ID
      if (!isNaN(id)) {
        this.loadEventId(id); // Call the method only if id is valid
      } else {
        console.error('Invalid Event ID: NaN');
        this.errorMessage = 'Invalid Event ID';
      }
    } else {
      console.error('Invalid Event ID');
      this.errorMessage = 'Invalid Event ID';
    }
  
  }
  logEventId(eventId: number): void {
    console.log('Event ID:', eventId); // Log the event ID
  }
  
  

  loadEventId(id: number): void {
    console.log('Fetching event with ID:', id); // Log the event ID before API call
    this.eventapiservice.getEventById(id).subscribe({
      next: (event) => {
        console.log('Event data:', event); // Log the event data
        this.event = event;
        console.log('Assigned Event:', this.event); // Log assigned event
      },
      error: (err) => {
        this.errorMessage = 'Failed to load event details.';
        console.error('Backend error:', err); // Log error details
      }
    });
  
  }
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

  signUpForEvent(eventId: number): void {
    const eventSignUp = { userid: this.userId, eventId: eventId };
    this.eventSignup.createEventSignUp(eventSignUp).subscribe(
      () => {
        alert('Signed up successfully!');
      },
      (error) => {
        console.error('Sign up failed', error);
      }
    );
  }
}
  