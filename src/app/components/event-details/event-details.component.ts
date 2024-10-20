import { Component, inject, Input, OnInit } from '@angular/core';
import { EventApiService } from '../../services/event-api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  @Input() event!: Event;
  eventService = inject(EventApiService);
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private EventApiService: EventApiService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEvent(id);
  }

  loadEvent(id: number): void {
    this.EventApiService.getEventById(id).subscribe({
      next: (event: Event) => {
        this.event = event;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load event details. Please try again later.';
      }
    });
  }
}
