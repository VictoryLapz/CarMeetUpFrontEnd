import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviornment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userURL: string = environment.apiUrl + "/User";

  constructor(private httpClient: HttpClient) { }

  registerUser(userDto: UserDto): Observable<User> {
    return this.httpClient.post<User>(`${this.userURL}`, userDto).pipe(
      catchError(this.handleError)
    );
  }

  // Update user profile
  updateUser(id: number, userDto: UserDto): Observable<User> {
    return this.httpClient.put<User>(`${this.userURL}/${id}`, userDto).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user profile
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.userURL}/${id}`).pipe(
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
