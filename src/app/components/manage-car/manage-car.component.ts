import { Component, OnInit } from '@angular/core';
import { Car} from '../../models/car';
import { CarApiService } from '../../services/car-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-car',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './manage-car.component.html',
  styleUrl: './manage-car.component.css'
})
export class ManageCarComponent  implements OnInit {

  carForm: FormGroup;
  cars: Car[] = [];
  selectedCarId: number | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private carService: CarApiService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      id: [{value: '', disabled: true}],
      cityMpg: ['', Validators.required],
      class: ['', Validators.required],
      combinationMpg: ['', Validators.required],
      cylinders: ['', Validators.required],
      displacement: ['', Validators.required],
      drive: ['', Validators.required],
      fuelType: ['', Validators.required],
      highwayMpg: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      transmission: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
      },
      error: (err) => this.errorMessage = err
    });
  }

  onCarSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue) {
      const carId = Number(selectedValue);
      this.selectedCarId = carId;
      this.carService.getCarById(carId).subscribe({
        next: (car) => {
          this.carForm.patchValue(car);  
        },
        error: (err) => this.errorMessage = err
      });
    }
  }


  updateCar(): void {
    if (this.selectedCarId) {
      const updatedCar: Car = this.carForm.getRawValue();
      this.carService.updateCar(this.selectedCarId, updatedCar).subscribe({
        next: () => {
          alert('Car updated successfully!');
          this.loadCars();  // Refresh car list
        },
        error: (err) => this.errorMessage = err
      });
    }
  }

  deleteCar(): void {
    if (this.selectedCarId) {
      if (confirm('Are you sure you want to delete this car?')) {
        this.carService.deleteCar(this.selectedCarId).subscribe({
          next: () => {
            alert('Car deleted successfully!');
            this.selectedCarId = null;
            this.carForm.reset();  // Clear form
            this.loadCars();  // Refresh car list
          },
          error: (err) => this.errorMessage = err
        });
      }
    }
  }

  resetForm(): void {
    this.carForm.reset();
    this.selectedCarId = null;
  }


}
