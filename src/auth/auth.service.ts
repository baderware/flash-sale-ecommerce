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

  async validateUser(name: string, password: string) {
    const user = await this.usersService.findAll();
    const found = user.find((u) => u.name === name);

    if (!found) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return found;
  }

  async login(data: any) {

    const user = await this.validateUser(data.name, data.password);

    const payload = { sub: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}