import { Products } from './product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product_details' })
export class Details {
  @PrimaryColumn()
  id: string;

  @Column()
  processor: string;

  @Column({ nullable: true })
  motherboard: string;

  @Column()
  memory: string;

  @Column()
  storage: string;

  @Column()
  graphics: string;

  @Column({ nullable: true })
  casing: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToOne(() => Products, (product) => product.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Products;
}
