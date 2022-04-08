import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Events } from '../models/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventsData: Events[];
  isLoading = false;
  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe(
      (res) => {
        this.eventsData = res;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}
