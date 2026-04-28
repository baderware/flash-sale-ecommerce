import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Better validation: Search by EMAIL directly in the DB
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email); // Create this method in UsersService
    
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // Strip password before returning
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const userInfo=await this.validateUser(user.email,user.password)
    // 2. Add the ROLE to the payload so the frontend and guards can see it
    console.log(userInfo);
    //const userInfo= await this.usersService.findOneByEmail(user.email);
    const payload = { 
      sub: userInfo.id, 
      email: user.email, 
      role: userInfo.role // Now your JwtAuthGuard can check permissions!
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}