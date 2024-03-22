import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar', length: 10 })
  status = Status.Prepared;

  get isPrepared(): boolean {
    return this.status === Status.Prepared;
  }

  start() {
    this.status = Status.Ongoing;
    return this;
  }

  close() {
    this.status = Status.Closed;
    return this;
  }
}
