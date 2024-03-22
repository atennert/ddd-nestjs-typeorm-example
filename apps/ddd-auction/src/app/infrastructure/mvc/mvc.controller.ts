import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { Bikes } from '../repository/bikes';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class MvcController {
  constructor(private readonly bikes: Bikes) {}

  @Get()
  @Render('index')
  async listBikes() {
    const bikes = await this.bikes.listAllBikes();
    return { bikes };
  }

  @Get('bike/:id')
  @Render('bike')
  async showBike(@Param('id') bikeId: number) {
    const bike = await this.bikes.getBike(bikeId);
    return { bike };
  }

  @Post('bike/:id')
  @UseInterceptors(NoFilesInterceptor())
  @Render('bike')
  async bidOnBike(
    @Param('id') bikeId: number,
    @Body() { amount }: { amount: number }
  ) {
    try {
      await this.bikes.placeBidOnBike(bikeId, 0, amount);
    } catch (e) {
      return { warning: `Your bid has not been placed: ${e.message}.` };
    }

    const bike = await this.bikes.getBike(bikeId);
    return { bike, message: 'Your bid has been placed' };
  }
}
