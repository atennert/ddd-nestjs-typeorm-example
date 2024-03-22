import { Inject, Injectable } from '@nestjs/common';
import { Event } from './events';
import { HttpService } from '@nestjs/axios';

export const EVENT_TARGET = 'EVENT_TARGET';

@Injectable()
export class EventSender {
  constructor(
    private readonly httpService: HttpService,
    @Inject(EVENT_TARGET) private readonly targetUrl: string
  ) {}

  async sendEvent(event: Event) {
    const eventTargetUrl = `http://${this.targetUrl}/message`;

    console.log('sending event', eventTargetUrl, event.id);

    this.httpService.post(eventTargetUrl, event).subscribe({
      next: (response) =>
        console.log('Response for event', response.status, response.statusText),
    });
  }
}
