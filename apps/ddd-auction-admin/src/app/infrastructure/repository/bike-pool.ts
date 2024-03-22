import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bike } from '../../domain/bike/bike.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BikePool {
  constructor(
    @InjectRepository(Bike) private readonly bikeRepository: Repository<Bike>
  ) {}

  addBike(bike: Partial<Bike>): Promise<Bike> {
    const createdBike = this.bikeRepository.create(bike);
    return this.bikeRepository.save(createdBike);
  }

  async listFromAuction(id: number) {
    return this.bikeRepository.findBy({ auctionId: id });
  }
}
