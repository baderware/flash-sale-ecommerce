// src/orders/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ type: 'int' })
  totalAmount: number; // Stored in cents

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  // The customer who placed the order
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // The actual items inside the order
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}