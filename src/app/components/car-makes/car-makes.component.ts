import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-car-makes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-makes.component.html',
  styleUrl: './car-makes.component.css'
})
export class CarMakesComponent implements OnInit {

  carMakes: string[] = [];
  selectedCarMake?: string;
  isLoading = true;
  error: string | null = null;

  constructor(private carApiService: CarApiService) {}

  ngOnInit(): void {
    this.getCarMakes();
  }

  getCarMakes(): void {
    this.carApiService.getCarMakes().subscribe({
      next: (makes) => {
        this.carMakes = makes;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load car makes';
        this.isLoading = false;
      }
    });
  }

 

}
