import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Car } from '../models/car';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  carUrl: string = environment.apiUrl+ "/Car";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.carUrl).pipe(catchError(this.handleError));
  }

  getCarById(id: number): Observable<Car> {
    return this.httpClient.get<Car>(`${this.carUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createCar(car: Omit<Car, 'Id'>): Observable<Car> {
    return this.httpClient.post<Car>(`${this.carUrl}`, car).pipe(
      catchError(this.handleError)
    );
  }

  updateCar(id: number, car: Car): Observable<void> {
    return this.httpClient.put<void>(`${this.carUrl}/${id}`, car).pipe(
      catchError(this.handleError)
    );
  }

  deleteCar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.carUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCarsFromExternalApi(make: string): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.carUrl}/external/${make}`).pipe(
      catchError(this.handleError)
    );
  }


//added some validation incase we need it

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
