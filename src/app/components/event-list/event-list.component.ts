import { Component, inject, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from "../event-card/event-card.component";
import { EventApiService } from '../../services/event-api.service';
import { Event } from '../../models/event';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{

  eventService = inject(EventApiService);
  events: Event[] = [];
  errorMessage: string = "";

  constructor(private eventapiservice: EventApiService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventapiservice.getEvents().subscribe(
      (events) => {
      this.events = events;
    })
  }
}
