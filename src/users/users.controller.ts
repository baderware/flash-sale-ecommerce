import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth.decorator';
import { UserRole } from './entities/user.entity';

//@UseGuards(JwtAuthGuard)
//@ApiTags('users')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**@Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }**/
  
  @Get()
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users' }) // Describes what the endpoint does
  @ApiResponse({ status: 200, description: 'Return all users.' }) // Documents the response
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get specific user' }) // Describes what the endpoint does
  @ApiResponse({ status: 200, description: 'Return the specific users.' }) // Documents the response
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  //for now only the admin can change users profile
  @Patch(':id')
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'edit a specific user' }) // Describes what the endpoint does
  @ApiResponse({ status: 200, description: 'edit  a user.' }) // Documents the response
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }
  
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'delete a user' }) // Describes what the endpoint does
  @ApiResponse({ status: 200, description: 'delete a users.' }) // Documents the response
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
