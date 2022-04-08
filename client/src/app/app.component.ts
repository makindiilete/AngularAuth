import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(private authService: AuthService) {}

  handleClick($event: MouseEvent) {
    console.log($event);
    alert('Clicked');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
