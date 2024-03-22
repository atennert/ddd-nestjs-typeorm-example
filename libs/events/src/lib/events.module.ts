import { DynamicModule, Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { EVENT_TARGET, EventSender } from './event-sender.service';
import { HttpModule } from '@nestjs/axios';

export interface EventsModuleOptions {
  eventTargetUrl: string;
}

@Module({})
export class EventsModule {
  static forRootAsync(options: EventsModuleOptions): DynamicModule {
    return {
      module: EventsModule,
      imports: [HttpModule],
      controllers: [MessagingController],
      providers: [
        EventSender,
        {
          provide: EVENT_TARGET,
          useValue: options.eventTargetUrl,
        },
      ],
      exports: [EventSender],
    };
  }
}
