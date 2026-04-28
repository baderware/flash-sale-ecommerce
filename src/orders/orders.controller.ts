// src/orders/orders.controller.ts
import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Auth } from 'src/auth.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //
  @Post()
  @Auth() // Must be logged in
  create(@Req() req, @Body() dto: CreateOrderDto) {
    // req.user is attached by your JwtAuthGuard
    return this.ordersService.create(req.user.userId, dto);
  }

  @Get('my-orders')
  @Auth()
  findMyOrders(@Req() req) {
    return this.ordersService.findByUser(req.user.userId);
  }


  @Get()
  @Auth(UserRole.ADMIN) 
  findAll() {
    return this.ordersService.findAll();
  }
}