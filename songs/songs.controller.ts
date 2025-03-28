import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  HttpStatus,
  Param,
  HttpException,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './DTO/create-song-dto';
import { Song } from './song-entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }
}
