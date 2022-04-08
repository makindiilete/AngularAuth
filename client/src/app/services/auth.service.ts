import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5555/api';
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: User) {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  loginUser(user: User) {
    return this.http.post<any>(`${this.url}/login`, user);
  }

  loggedIn() {
    // return true is token exist or false if it does not
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOutUser() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/events');
  }
}
