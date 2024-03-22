import { Event } from './event';

export class AuctionClosedEvent extends Event {
  override id = 'auction-closed-event';

  auctionId!: number;

  static create(auctionId: number): AuctionClosedEvent {
    const event = new AuctionClosedEvent();
    event.auctionId = auctionId;
    return event;
  }
}
