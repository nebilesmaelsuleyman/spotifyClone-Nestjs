import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  HttpStatus,
  Param,
  HttpException,
  Put,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './DTO/create-song-dto';
import { UpdateSongDto } from './DTO/update-song-dto';
import { Song } from './song-entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    console.log(createSongDTO);
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  @Post()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    const song = await this.songsService.findOne(id);
    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }
    return song;
  }
  @Post()
  remove(@Param('id', new ParseIntPipe({})) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
  }
}
