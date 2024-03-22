import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BikeDto } from '@ddd-auction/dtos';
import { Bid } from './bid.entity';

@Entity()
export class Bike implements BikeDto {
  @PrimaryColumn()
  globalId!: number;

  @Column()
  auctionId!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  color!: string;

  @OneToMany(() => Bid, (bid) => bid.bike)
  bids!: Bid[];

  get hasBids(): boolean {
    return this.bids.length > 0;
  }

  get highestBid(): Bid | null {
    if (!this.hasBids) {
      return null;
    }
    return this.bids.reduce((bid1, bid2) =>
      bid1.amountCent >= bid2.amountCent ? bid1 : bid2
    );
  }

  get winningBid(): Bid | null {
    return this.highestBid;
  }

  isNewHighestBid(amountInCent: number): boolean {
    return amountInCent > (this.highestBid?.amountCent ?? 0);
  }

  placeBid(bid: Bid) {
    this.bids.push(bid);
    return this;
  }
}
