import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviornment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { EventSignUpDto } from '../models/event-signup-dto';
import { EventSignUp } from '../models/event-signup';

@Injectable({
  providedIn: 'root'
})
export class EventSignupService {

  signUpURL: string = environment.apiUrl + "/Sign-up";

  constructor(private httpClient: HttpClient) { }


    getEventSignUpsByUserId(userId: number): Observable<EventSignUpDto[]> {
      return this.httpClient.get<EventSignUpDto[]>(`${this.signUpURL}/${userId}`).pipe(
        catchError(this.handleError)
      );
    }

    createEventSignUp(eventSignUp: EventSignUp): Observable<EventSignUp> {
      return this.httpClient.post<EventSignUp>(`${this.signUpURL}`, eventSignUp).pipe(
        catchError(this.handleError)
      );
    }

    deleteEventSignUp(userId: number, eventId: number): Observable<void> {
      const url = `${this.signUpURL}/userId=${userId}/eventId=${eventId}`;
      return this.httpClient.delete<void>(url).pipe(
        catchError(this.handleError)
      );
    }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong.');
  }
}
