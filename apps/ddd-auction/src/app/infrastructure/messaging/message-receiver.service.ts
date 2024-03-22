import { Injectable } from '@nestjs/common';
import {
  AuctionClosedEvent,
  AuctionStartedEvent,
  Event,
  EventHandler,
} from '@ddd-auction/events';
import { PlatformService } from '../../application/platform.service';

@Injectable()
export class EventReceiver implements EventHandler {
  constructor(private readonly bikeService: PlatformService) {}

  async handleEvent(event: Event): Promise<void> {
    if (event.id === new AuctionStartedEvent().id) {
      await this.bikeService.offerBikesForAuction(
        (event as AuctionStartedEvent).auctionId
      );
    } else if (event.id === new AuctionClosedEvent().id) {
      await this.bikeService.closeBiddingForBikesFromAuction(
        (event as AuctionClosedEvent).auctionId
      );
    }
  }
}
