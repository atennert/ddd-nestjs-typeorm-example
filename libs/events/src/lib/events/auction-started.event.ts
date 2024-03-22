import { Event } from './event';

export class AuctionStartedEvent extends Event {
  override id = 'auction-started-event';

  auctionId!: number;

  static create(auctionId: number): AuctionStartedEvent {
    const event = new AuctionStartedEvent();
    event.auctionId = auctionId;
    return event;
  }
}
