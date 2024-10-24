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
