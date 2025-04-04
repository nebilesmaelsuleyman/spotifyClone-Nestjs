import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import * as bcrypt from 'bcryptjs';
import { Enable2FAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy';
import { console } from 'node:inspector/promises';
import { Flag } from 'lucide-react';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(loginDto: LoginDTO) {
    const user = await this.usersService.findOne(loginDto);

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (passwordMatched) {
      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }
      return {
        user,
        accessToken: this.jwtService.sign(payload),
      };
    }
    return user;
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.usersService.findById(userId); //1
    console.log('user form enable2FA', user);
    if (user && user.enable2FA) {
      //2
      return { secret: user.twoFASecret };
    }

    const secret = speakeasy.generateSecret(); //3
    console.log(secret);

    if (user) {
      user.twoFASecret = secret.base32; //4
      await this.usersService.updateSecretKey(user.id, user.twoFASecret); //5
    }
    return { secret: user?.twoFASecret || '' }; //6
  }

  async validate2FA(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.usersService.findById(userId);

      const verified = speakeasy.totp.verify({
        secret: user?.twoFASecret || '',
        token: token,
        encoding: 'base32',
        window: 1,
      });

      console.log('verified..', verified);
      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (error) {
      throw new UnauthorizedException('error verifying token');
    }
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersService.disable2FA(userId);
  }
}
