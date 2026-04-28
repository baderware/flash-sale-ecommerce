// src/orders/orders.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(userId: number, dto: CreateOrderDto) {
    let grandTotal = 0;
    const orderItems: any[] = [];

    // 1. Loop through the requested items
    for (const item of dto.items) {
      const product = await this.productRepo.findOneBy({ id: item.productId });
      
      if (!product) throw new NotFoundException(`Product #${item.productId} not found`);
      if (product.stock < item.quantity) throw new BadRequestException(`Not enough stock for ${product.name}`);

      // 2. Lock in the price and calculate the total for this item
      grandTotal += product.price * item.quantity;

      orderItems.push({
        product: { id: product.id }, // Link the product
        quantity: item.quantity,
        priceAtPurchase: product.price, // Lock in the historical price!
      });

      // 3. Optional: Deduct stock from the product here
      // product.stock -= item.quantity;
      // await this.productRepo.save(product);
    }

    // 4. Create and save the final order
    const order = this.orderRepo.create({
      user: { id: userId } as User, // Link the customer who bought it
      totalAmount: grandTotal,
      items: orderItems, // TypeORM's { cascade: true } will automatically save these to the OrderItem table!
    });

    return await this.orderRepo.save(order);
  }

  // Find all orders for ONE specific user
  async findByUser(userId: number) {
    return await this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'], // Bring back the receipt details
      order: { createdAt: 'DESC' },
    });
  }

  // Admin: Find ALL orders across the whole store
  async findAll() {
    return await this.orderRepo.find({ relations: ['user', 'items'] });
  }
}