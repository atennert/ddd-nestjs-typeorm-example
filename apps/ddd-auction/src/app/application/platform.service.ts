import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'process';
import { BikeDto } from '@ddd-auction/dtos';
import { Bikes } from '../infrastructure/repository/bikes';
import { EventSender } from '@ddd-auction/events';
import { BidWonEvent } from '@ddd-auction/events';

@Injectable()
export class PlatformService {
  private readonly adminUrl = `http://${process.env.ADMIN_ADDRESS}/api`;

  constructor(
    private readonly httpService: HttpService,
    private readonly bikes: Bikes,
    private readonly eventSender: EventSender
  ) {}

  async offerBikesForAuction(auctionId: number) {
    this.httpService
      .get<BikeDto[]>(`${this.adminUrl}/auction/${auctionId}/bikes`)
      .subscribe({
        next: async (response) => {
          await this.bikes.addBikesForAuction(response.data);
        },
      });
  }

  async closeBiddingForBikesFromAuction(auctionId: number) {
    const winningBids = await this.bikes.closeBikeAuction(auctionId);

    winningBids.forEach((winningBid) => {
      this.eventSender.sendEvent(
        BidWonEvent.create(
          winningBid.bikeId,
          winningBid.bidderId,
          winningBid.amountCent
        )
      );
    });
  }
}
