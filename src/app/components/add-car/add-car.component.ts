import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { Car } from '../../models/car';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  
cars: Car[] = [];
addCar: Car = {
  id: 0, 
  cityMpg: 0,
  class: '',
  combinationMpg: 0,
  cylinders: 0,
  displacement: 0,
  drive: '',
  fuelType: '',
  highwayMpg: 0,
  make: '',
  model: '',
  transmission: '',
  year: 0
};
  
constructor(private carApiService: CarApiService) {}

  ngOnInit(): void {
    this.createCar();
  }

  createCar(): void {
    this.carApiService.createCar(this.addCar).subscribe({
      next: (newCar: Car) => {
        this.cars.push(newCar);
        this.addCar = { cityMpg: 0, class: '', combinationMpg: 0, cylinders: 0, displacement: 0, drive: '', fuelType: '', highwayMpg:0 , make: '', model: '', transmission: '', year: 0 };
      },
      error: (err: any) => console.error(err)
    });
  }
  newEvent(newEvent: any) {
    throw new Error('Method not implemented.');
  }

}
