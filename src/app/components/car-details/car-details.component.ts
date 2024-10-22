import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { Car } from '../../models/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  cars: Car[] = [];
  searchMakeCar: string = '';

  constructor(private carApiService: CarApiService) {}
  
  ngOnInit(): void {
    this.getCars();
  } //on initialization, bring this method first automatically! 
  
  getCars(): void {
    this.carApiService.getCars().subscribe({
      next: (cars) => this.cars = cars,
      error: (err) => console.error(err)
    });
  }

  getCarsFromExternalApi() : void {
    this.carApiService.getCarsFromExternalApi(this.searchMakeCar).subscribe({
      next: (cars) => this.cars = cars,
      error: (err) => console.error(err)
    });
  }

}
