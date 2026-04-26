import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  // Many OrderItems belong to ONE Order.
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}