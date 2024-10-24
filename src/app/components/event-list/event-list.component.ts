import { Component, inject, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventApiService } from '../../services/event-api.service';
import { Event } from '../../models/event';
import { RouterModule } from '@angular/router';
import { EventSignupService } from '../../services/event-signup.service';
import { EventSignupComponent } from '../event-signup/event-signup.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, EventSignupComponent, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{

  eventService = inject(EventApiService);
  eventSignup = inject (EventSignupService);
  events: Event[] = [];
  errorMessage: string = "";
  userId: number = 1;
  

  constructor(private eventapiservice: EventApiService) {}

  ngOnInit(): void  {
    this.loadEvents();
  }
  ngOnChanges(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventapiservice.getAllEvents().subscribe(
      (events) => {
      this.events = events;
    })
  }

  logEventId(event: Event): void {
    console.log('Event:', event);
    console.log('Event ID:', event.eventId); 
     // Log the entire event object
  }  

  
  signUpForEvent(eventId: number): void {
    const eventSignUp = { userid: this.userId, eventid: eventId };
    this.eventSignup.createEventSignUp(eventSignUp).subscribe(
      () => {
        alert("Signed up successfully!");
      },
      (error) => {
        console.error("Sign up failed", error);
      }
    );
  }
}
