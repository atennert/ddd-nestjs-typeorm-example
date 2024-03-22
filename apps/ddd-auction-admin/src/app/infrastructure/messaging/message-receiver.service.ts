import { Injectable } from '@nestjs/common';
import { Event, EventHandler } from '@ddd-auction/events';

@Injectable()
export class EventReceiver implements EventHandler {
  handleEvent(event: Event): void {
    console.log(event);
  }
}
