import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders') 
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; 

  // An Order has MANY OrderItems. 
  // The second argument tells TypeORM how to find the reverse side of this relationship.
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}