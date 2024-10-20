import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventSignupService } from '../../services/event-signup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './event-signup.component.html',
  styleUrl: './event-signup.component.css'
})
export class EventSignupComponent {

  eventId?: number;
  userId: number = 1; // Assuming the user is hardcoded or fetched from a service
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private eventSignupService: EventSignupService) {}

  onSubmit(): void {
    const eventSignUp = { userid: this.userId, eventid: this.eventId };
    this.eventSignupService.createEventSignUp(eventSignUp).subscribe(
      () => {
        this.successMessage = 'Signed up successfully!';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Sign up failed. Please try again later.';
        this.successMessage = '';
        console.error('Sign up failed', error);
      }
    );
  }
}
