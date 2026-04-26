import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('orders') 
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; 
  //below  are relationshiped columns.
  //MANY orders can be belonged to an user.
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  // An Order has MANY OrderItems.
  // The second argument tells TypeORM how to find the reverse side of this relationship.
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}