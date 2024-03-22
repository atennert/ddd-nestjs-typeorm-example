import { Event } from './events/event';

export const EVENT_HANDLER = 'EVENT_HANDLER';

export interface EventHandler {
  handleEvent(event: Event): Promise<void> | void;
}
