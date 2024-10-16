import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {

  private baseURL: string = environment.apiUrl + "/Event";

  constructor(private http : HttpClient) { }


  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.baseURL}`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseURL}/${id}`);
  }

  updateEvent(updatedEvent: Event): Observable<Event> {
    // For PUT, pass the body data as a second parameter after the URL
    return this.http.put<Event>(`${this.baseURL}/${updatedEvent.eventid}`, updatedEvent);
  };

  
//   addEvent(newBook: Book): Observable<Book> {
//     // For POST, pass the body data as a second parameter after the URL
//     return this.http.post<Book>(`${this.baseURL}`, newBook);
//   };

//   deleteEvent(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseURL}/${id}`);
//   };

// }
}