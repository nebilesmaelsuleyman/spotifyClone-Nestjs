import { Controller, Get, Post, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './DTO/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDTO): void {
    this.songsService.create(createSongDTO);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }
}
