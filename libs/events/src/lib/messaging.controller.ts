import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { EVENT_HANDLER, EventHandler } from './event-handler.model';
import { Event } from './events';
import { ModuleRef } from '@nestjs/core';

@Controller('message')
export class MessagingController implements OnModuleInit {
  private messageHandler?: EventHandler = undefined;

  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.messageHandler = await this.moduleRef.get(EVENT_HANDLER, {
      strict: false,
    });
  }

  @Post()
  receiveEvent(@Body() event: Event) {
    console.log('received event', event);
    this.messageHandler?.handleEvent(event);
  }
}
