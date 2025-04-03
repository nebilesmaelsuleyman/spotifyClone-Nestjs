import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user-entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';

import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt(); // 2.
    userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
    const user = await this.userRepository.save(userDTO); // 4.
    // delete user.password;
    return user;
  }
  async findOne(data: LoginDTO) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('could not find user');
    }
    return user;
  }

  async findById(id: number) {
    const userId = await this.userRepository.findOneBy({ id: id });
    return userId;
  }

  async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      { twoFASecret: secret, enable2FA: true },
    );
  }
}
