import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  handleClick($event: MouseEvent) {
    console.log($event);
    alert('Clicked');
  }
}
