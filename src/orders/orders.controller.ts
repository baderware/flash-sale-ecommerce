
import { Controller, Get, Post, Body, Req, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Auth } from 'src/auth.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UpdateOrderStatusDto } from './dto/update-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //
  @Post()
  @Auth() // Must be logged in
  create(@Req() req, @Body() dto: CreateOrderDto) {
    // req.user is attached by JwtAuthGuard
    console.log(req.user);
    return this.ordersService.create(req.user.userId, dto);
  }

  @Get('my-orders')
  @Auth()
  findMyOrders(@Req() req) {
    return this.ordersService.findByUser(req.user.userId);
  }
  @Patch(':id/status')
  @Auth(UserRole.ADMIN) // <--- Bouncer checks for Admin!
  updateStatus(
    @Param('id') id: string, 
    @Body() updateStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateStatusDto.status);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }
}