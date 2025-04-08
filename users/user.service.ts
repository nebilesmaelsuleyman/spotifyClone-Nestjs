import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user-entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from 'uuid';

import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt(); // 2.

    if (!userDTO.password) {
      throw new Error('user must provide password');
    }

    user.password = await bcrypt.hash(userDTO.password, salt);

    const savedUser = await this.userRepository.save(user); // 4.

    return savedUser;
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

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      { twoFASecret: secret, enable2FA: true },
    );
  }

  async disable2FA(userId: number) {
    return this.userRepository.update(
      { id: userId },
      { enable2FA: false, twoFASecret: '' },
    );
  }
  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ apiKey });
    if (!user) {
      throw new UnauthorizedException(
        'User not found with the provided API key',
      );
    }
    return user;
  }
}
