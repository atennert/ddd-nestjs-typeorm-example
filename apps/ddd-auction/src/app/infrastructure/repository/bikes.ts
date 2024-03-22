import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bike } from '../../domain/bike/bike.entity';
import { Repository } from 'typeorm';
import { Bid } from '../../domain/bike/bid.entity';

@Injectable()
export class Bikes {
  constructor(
    @InjectRepository(Bike) private readonly bikeRepository: Repository<Bike>
  ) {}

  async addBikesForAuction(bikes: Partial<Bike>[]) {
    const createdBikes = this.bikeRepository.create(bikes);
    await this.bikeRepository.save(bikes);
  }

  async listAllBikes(): Promise<Bike[]> {
    return this.bikeRepository.find();
  }

  async getBike(bikeId: number) {
    return this.bikeRepository.findOneBy({ globalId: bikeId });
  }

  async placeBidOnBike(bikeId: number, bidderId: number, amountInCent: number) {
    await this.bikeRepository.manager.transaction(async (manager) => {
      const bike = await manager.findOne(Bike, {
        relations: ['bids'],
        where: { globalId: bikeId },
      });

      if (!bike) {
        throw 'The bike is not available anymore';
      }
      if (!bike.isNewHighestBid(amountInCent)) {
        throw 'There is already a higher bid';
      }
      const bid = manager.create(Bid, {
        bikeId,
        bidderId,
        amountCent: amountInCent,
      });
      await manager.save(bike.placeBid(bid));
    });
  }

  async closeBikeAuction(auctionId: number): Promise<Bid[]> {
    return this.bikeRepository.manager.transaction(async (manager) => {
      const bikesFromAuction = await manager.find(Bike, {
        relations: ['bids'],
        where: {
          auctionId,
        },
      });

      const winningBids = bikesFromAuction
        .filter((bike) => bike.hasBids)
        .map((bike) => bike.winningBid);

      await manager.delete(Bike, { auctionId });

      return winningBids;
    });
  }
}
