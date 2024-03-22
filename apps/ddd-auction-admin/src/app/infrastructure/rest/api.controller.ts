import { Controller, Get, Param } from '@nestjs/common';
import { BikeDto } from '@ddd-auction/dtos';
import { BikePool } from '../repository/bike-pool';

@Controller('api')
export class ApiController {
  constructor(private readonly bikes: BikePool) {}

  @Get('auction/:id/bikes')
  async getBikesFromAuction(@Param('id') id: number): Promise<BikeDto[]> {
    const bikes = await this.bikes.listFromAuction(id);

    return bikes.map((bike) => ({
      globalId: bike.id,
      auctionId: bike.auctionId,
      name: bike.name,
      color: bike.color,
      type: bike.type,
    }));
  }
}
