import { Component,OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthButtonComponent } from '../login/login.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule,CommonModule,AuthButtonComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  isChildRoute: boolean = false; 

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isChildRoute = this.router.url !== '/';
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
