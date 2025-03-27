import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  HttpStatus,
  Param,
} from '@nestjs/common';
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
  @Get()
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch song based ont eh id ${typeof id}`;
  }
}
