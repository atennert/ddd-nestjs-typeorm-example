import { Module } from '@nestjs/common';

import { MvcController } from './infrastructure/mvc/mvc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { Bid } from './domain/bike/bid.entity';
import { Bike } from './domain/bike/bike.entity';
import { EVENT_HANDLER, EventsModule } from '@ddd-auction/events';
import { EventReceiver } from './infrastructure/messaging/message-receiver.service';
import { HttpModule } from '@nestjs/axios';
import { PlatformService } from './application/platform.service';
import { Bikes } from './infrastructure/repository/bikes';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.PLATFORM_DB,
      entities: [Bid, Bike],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Bid, Bike]),
    EventsModule.forRootAsync({
      eventTargetUrl: process.env.ADMIN_ADDRESS,
    }),
    HttpModule,
  ],
  controllers: [MvcController],
  providers: [
    PlatformService,
    Bikes,
    {
      provide: EVENT_HANDLER,
      useClass: EventReceiver,
    },
  ],
})
export class AppModule {}
