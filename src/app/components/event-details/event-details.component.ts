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
  