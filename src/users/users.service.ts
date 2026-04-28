import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  async create(data: any) {
    const hashedPassword = await bcrypt.hash( data.password, 10);
    const user = this.repo.create({
    ...data,
    password: hashedPassword,
  });

  return this.repo.save(user);
}

  findAll() {
    return this.repo.find();
  }


findOne(id: number) {
  return this.repo.findOne({
    where: { id },
    select: ['id', 'email', 'firstName', 'lastName', 'role'] 
  });
}
//this one is more uniques for identification.
async findOneByEmail(email: string) {
  return await this.repo.findOneBy({ email });
}
  update(id: number, data: Partial<User>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
