import { Component } from '@angular/core';

import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Comtravo';
  public messages = [];

  constructor(private eventService: EventService) {
    this.eventService.getEvent().subscribe(event => {
      this.messages.push(event);
       setTimeout(() => {
          if (this.messages && this.messages.length > 0) {
            this.messages.shift();
          }
        }, event.index * 2000);
    });
  }

  onClose(pIndex): void {
    this.messages.splice(pIndex, 1);
  }

  trackByIndex(index: number) {
    return index;
  }

}


