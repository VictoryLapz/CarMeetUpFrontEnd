import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { Car } from '../../models/car';
import { CommonModule, formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  cars: Car[] = [];
  searchMakeCar: string = '';

  // Array to store random car image URLs from Picsum
  randomImageUrls: string[] = [
    'https://picsum.photos/seed/1/400/300',
    'https://picsum.photos/seed/2/400/300',
    'https://picsum.photos/seed/3/400/300',
    'https://picsum.photos/seed/4/400/300',
    'https://picsum.photos/seed/5/400/300',
    'https://picsum.photos/seed/6/400/300',
    'https://picsum.photos/seed/7/400/300',
    'https://picsum.photos/seed/8/400/300',
    'https://picsum.photos/seed/9/400/300',
    'https://picsum.photos/seed/10/400/300',
    'https://picsum.photos/seed/11/400/300',
    'https://picsum.photos/seed/12/400/300',
    'https://picsum.photos/seed/13/400/300',
    'https://picsum.photos/seed/14/400/300',
    'https://picsum.photos/seed/15/400/300',
    'https://picsum.photos/seed/16/400/300',
    'https://picsum.photos/seed/17/400/300',
    'https://picsum.photos/seed/18/400/300',
    'https://picsum.photos/seed/19/400/300',
    'https://picsum.photos/seed/20/400/300',
    'https://picsum.photos/seed/21/400/300',
    'https://picsum.photos/seed/22/400/300',
    'https://picsum.photos/seed/23/400/300',
    'https://picsum.photos/seed/24/400/300',
    'https://picsum.photos/seed/25/400/300',
    'https://picsum.photos/seed/26/400/300',
    'https://picsum.photos/seed/27/400/300',
    'https://picsum.photos/seed/28/400/300',
    'https://picsum.photos/seed/29/400/300',
    'https://picsum.photos/seed/30/400/300'
  ];

  constructor(private carApiService: CarApiService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carApiService.getCars().subscribe({
      next: (cars) => this.cars = cars,
      error: (err) => console.error(err)
    });
  }

  getCarsFromExternalApi(): void {
    this.carApiService.getCarsFromExternalApi(this.searchMakeCar).subscribe({
      next: (cars) => this.cars = cars,
      error: (err) => console.error(err)
    });
  }
}
