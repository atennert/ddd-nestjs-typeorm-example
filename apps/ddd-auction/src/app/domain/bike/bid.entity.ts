import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Bike } from './bike.entity';

@Entity()
export class Bid {
  @PrimaryColumn()
  bidderId!: number;

  @PrimaryColumn()
  bikeId!: number;

  @Column({ type: 'int' })
  amountCent!: number;

  @ManyToOne(() => Bike, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'bikeId',
    referencedColumnName: 'id',
  })
  bike!: Bike;
}
