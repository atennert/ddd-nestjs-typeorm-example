import { Module } from '@nestjs/common';

import { MvcController } from './infrastructure/mvc/mvc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import process from 'process';
import { Auction } from './domain/auction/auction.entity';
import dotenv from 'dotenv';
import { Auctions } from './infrastructure/repository/auctions';
import { Bike } from './domain/bike/bike.entity';
import { BikePool } from './infrastructure/repository/bike-pool';
import { EventReceiver } from './infrastructure/messaging/message-receiver.service';
import { EventsModule, EVENT_HANDLER } from '@ddd-auction/events';
import { ApiController } from './infrastructure/rest/api.controller';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.ADMIN_DB,
      entities: [Auction, Bike],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Auction, Bike]),
    EventsModule.forRootAsync({
      eventTargetUrl: process.env.PLATFORM_ADDRESS,
    }),
  ],
  controllers: [MvcController, ApiController],
  providers: [
    Auctions,
    BikePool,
    {
      provide: EVENT_HANDLER,
      useClass: EventReceiver,
    },
  ],
})
export class AppModule {}
