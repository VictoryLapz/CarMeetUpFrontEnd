import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventSignupService } from '../../services/event-signup.service';
import { FormsModule } from '@angular/forms';
import { EventSignUpDto } from '../../models/event-signup-dto';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-event-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './event-signup.component.html',
  styleUrl: './event-signup.component.css'
})
export class EventSignupComponent implements OnInit {
  eventSignUps: EventSignUpDto[] = [];
  userId: number | null = null;

  eventSignupService = inject(EventSignupService);
  authService = inject(AuthService);

  ngOnInit(): void {
    // this.authService.user$.subscribe(user => {
    //   if (user && user.sub) {
    //     // Use the user ID from Auth0
    //     this.userId = +user.sub.split('|')[1]; // Extract user ID from Auth0
    //     this.getUserEventSignUps();
    //   }
    // });

    //Uncomment the following line to use a hardcoded user ID for testing:
    this.userId = 5; // Hardcoded user ID for local testing
    this.getUserEventSignUps(); // Fetch event sign-ups for the hardcoded user
  }

  getUserEventSignUps(): void {
    if (this.userId) {
      this.eventSignupService.getEventSignUpsByUserId(this.userId).subscribe(
        (response) => {
          console.log('API Response:', response); // Debugging: log the response
          this.eventSignUps = response;
        },
        (error) => {
          console.error('Error fetching event sign-ups:', error);
        }
      );
    }
  }

  deleteSignUp(eventId: number): void {
    if (this.userId) {
      this.eventSignupService.deleteEventSignUp(this.userId, eventId).subscribe(
        () => {

          this.getUserEventSignUps();
        },
        (error) => {
          console.error('Error deleting event sign-up:', error);
        }
      );
    }
  }
}
