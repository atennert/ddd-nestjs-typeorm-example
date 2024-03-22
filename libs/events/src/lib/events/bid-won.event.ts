import { Event } from './event';

export class BidWonEvent extends Event {
  override id = 'bid-won-event';

  bikeId!: number;
  bidderId!: number;
  amountInCent!: number;

  static create(
    bikeId: number,
    bidderId: number,
    amountInCent: number
  ): BidWonEvent {
    const event = new BidWonEvent();
    event.bikeId = bikeId;
    event.bidderId = bidderId;
    event.amountInCent = amountInCent;
    return event;
  }
}
