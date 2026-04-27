import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/log-in.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
 //the DI, this is basically where the we instantiate the things we need here 
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'register uaer in db' }) // Describes what the endpoint does
  @ApiResponse({ status: 201, description: 'registered ' }) // Documents the response
  @ApiResponse({ status: 400, description: 'input problem' })
  register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'verifying user in db ' }) // Describes what the endpoint does
  @ApiResponse({ status: 200, description: 'give session.' }) // Documents the response
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}