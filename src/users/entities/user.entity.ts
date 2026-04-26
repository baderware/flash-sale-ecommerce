import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

// this is very awesome for consisitency and avoiding error headache!
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;


  @Column({ 
    type: 'enum', 
    enum: UserRole, 
    default: UserRole.CUSTOMER
  })
  role: UserRole;

  //ONE User has MANY Orders
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}