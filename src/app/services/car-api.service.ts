import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  carUrl: string = environment.apiUrl+ "/Car";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.carUrl);
  }

  getCarById()

}
