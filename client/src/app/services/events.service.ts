import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../models/events';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private url = 'http://localhost:5555/api';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<Events[]>(`${this.url}/events`);
  }

  getSpecialEvents() {
    return this.http.get<Events[]>(`${this.url}/special`);
  }
}
