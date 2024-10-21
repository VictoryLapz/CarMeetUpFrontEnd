import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Event } from '../models/event';
import { EventDto } from '../models/event-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EventApiService {

   eventURL: string = environment.apiUrl + "/Event";

   constructor(private httpClient: HttpClient) { }


   getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.eventURL}`).pipe(
      catchError(this.handleError)
    );
  }

  getEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${this.eventURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createEvent(eventDto: EventDto): Observable<Event> {
    return this.httpClient.post<Event>(`${this.eventURL}`, eventDto).pipe(
      catchError(this.handleError)
    );
  }

  updateEvent(id: number, eventDto: EventDto): Observable<Event> {
    return this.httpClient.put<Event>(`${this.eventURL}/${id}`, eventDto).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.eventURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  searchEventsByCarMake(make: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.eventURL}/SearchbyMake?make=${make}`).pipe(
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
