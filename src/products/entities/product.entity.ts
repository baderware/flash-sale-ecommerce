// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column('text')
  description: string;

  @Column('int')
  price: number; 

  // How many items I actually have in my warehouse
  @Column('int', { default: 0 })
  stock: number; 

  @Column({ nullable: true })
  imageUrl: string; // The main picture of the product

  // MANY Products belong to ONE Category
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}