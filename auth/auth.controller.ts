import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { constants } from 'node:zlib';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/user-entity';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Enable2FAType } from './types';
import { JwtGuard } from './jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }

  @Get('enable-2fa')
  @UseGuards(JwtGuard)
  enable2FA(@Request() req): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }
}
