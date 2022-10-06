import { Category } from './category.entity';
import { Details } from './details.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryColumn()
  id: string;

  @Column()
  product_name: string;

  @Column()
  stock: number;

  @Column({ type: 'bigint' })
  price: number;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToOne(() => Details, (details) => details.product)
  @JoinColumn()
  details: Details;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;
}
