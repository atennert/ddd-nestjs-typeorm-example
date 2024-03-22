import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { Auction } from '../../domain/auction/auction.entity';
import { Auctions } from '../repository/auctions';
import { Bike } from '../../domain/bike/bike.entity';
import { BikePool } from '../repository/bike-pool';
import {
  AuctionClosedEvent,
  AuctionStartedEvent,
  EventSender,
} from '@ddd-auction/events';

@Controller()
export class MvcController {
  constructor(
    private readonly auctions: Auctions,
    private readonly bikes: BikePool,
    private readonly eventSender: EventSender
  ) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('create-auction')
  @Render('create-auction')
  getCreateAuction() {
    return {};
  }

  @Post('create-auction')
  @UseInterceptors(NoFilesInterceptor())
  @Render('create-auction')
  async createAuction(@Body() auction: Partial<Auction>) {
    await this.auctions.create(auction);
    return { message: 'auction created' };
  }

  @Get('add-bike')
  @Render('add-bike')
  async getAddBikeToAuction() {
    const preparedAuctions = await this.auctions.listPrepared();
    return { auctions: preparedAuctions };
  }

  @Post('add-bike')
  @UseInterceptors(NoFilesInterceptor())
  @Render('add-bike')
  async addBikeToAuction(@Body() auctionBike: Partial<Bike>) {
    const createdBike = await this.bikes.addBike(auctionBike);

    const preparedAuctions = await this.auctions.listPrepared();

    return { message: 'bike added to auction', auctions: preparedAuctions };
  }

  @Get('start-auction')
  @Render('start-auction')
  async getStartAuction() {
    const preparedAuctions = await this.auctions.listPrepared();
    return { auctions: preparedAuctions };
  }

  @Post('start-auction')
  @UseInterceptors(NoFilesInterceptor())
  @Render('start-auction')
  async startAuction(@Body() { auctionId }: { auctionId: number }) {
    await this.auctions.start(auctionId);
    await this.eventSender.sendEvent(AuctionStartedEvent.create(auctionId));

    const preparedAuctions = await this.auctions.listPrepared();
    return { message: 'Auction started', auctions: preparedAuctions };
  }

  @Get('close-auction')
  @Render('close-auction')
  async getCloseAuction() {
    const ongoingAuctions = await this.auctions.listOngoing();
    return { auctions: ongoingAuctions };
  }

  @Post('close-auction')
  @UseInterceptors(NoFilesInterceptor())
  @Render('close-auction')
  async closeAuction(@Body() { auctionId }: { auctionId: number }) {
    await this.auctions.close(auctionId);
    await this.eventSender.sendEvent(AuctionClosedEvent.create(auctionId));

    const ongoingAuctions = await this.auctions.listOngoing();
    return { message: 'Auction closed', auctions: ongoingAuctions };
  }
}
