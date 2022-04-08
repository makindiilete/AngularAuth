import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';
import { EventsService } from '../services/events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css'],
})
export class SpecialEventsComponent implements OnInit {
  specialEventsData: Events[];
  isLoading = false;
  constructor(private eventService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSpecialEvents();
  }

  fetchSpecialEvents() {
    this.isLoading = true;
    this.eventService.getSpecialEvents().subscribe(
      (res) => {
        this.specialEventsData = res;
        this.isLoading = false;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        this.isLoading = false;
      }
    );
  }
}
