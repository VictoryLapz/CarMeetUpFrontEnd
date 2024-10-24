import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthButtonComponent } from "./components/login/login.component";
import { FormsModule } from '@angular/forms';
import { EventListComponent } from "./components/event-list/event-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AuthButtonComponent, FormsModule, EventListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'The Car Lounge';

}
