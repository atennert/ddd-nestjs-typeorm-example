import { Injectable } from '@nestjs/common';
import { Auction } from '../../domain/auction/auction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../../domain/auction/status.enum';

@Injectable()
export class Auctions {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>
  ) {}

  async create(auction: Partial<Auction>): Promise<Auction> {
    const createdAuction = this.auctionRepository.create(auction);
    return this.auctionRepository.save(createdAuction);
  }

  async listPrepared(): Promise<Auction[]> {
    return this.auctionRepository.findBy({ status: Status.Prepared });
  }

  async start(auctionId: number) {
    await this.auctionRepository.manager.transaction(async (manager) => {
      const auction = await manager.findOneBy(Auction, { id: auctionId });
      await manager.save(auction.start());
    });
  }

  async listOngoing(): Promise<Auction[]> {
    return this.auctionRepository.findBy({ status: Status.Ongoing });
  }

  async close(auctionId: number) {
    await this.auctionRepository.manager.transaction(async (manager) => {
      const auction = await manager.findOneBy(Auction, { id: auctionId });
      await manager.save(auction.close());
    });
  }
}
