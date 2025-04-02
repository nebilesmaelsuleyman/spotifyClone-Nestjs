import { Controller, Post, Body } from '@nestjs/common';
import { constants } from 'node:zlib';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/user-entity';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }
}
