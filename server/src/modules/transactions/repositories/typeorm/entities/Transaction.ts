import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Establishment from '@modules/establishments/repositories/typeorm/entities/Establishment';
import Vehicle from '@modules/vehicles/repositories/typeorm/entities/Vehicle';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Establishment, {
    eager: true,
  })
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @Column()
  establishment_id: string;

  @ManyToOne(() => Vehicle, { eager: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column()
  vehicle_id: string;

  @Column()
  type: 'in' | 'out';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
