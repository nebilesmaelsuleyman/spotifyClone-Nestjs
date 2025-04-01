import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Song } from './song-entity';
import { CreateSongDTO } from './DTO/create-song-dto';
import { UpdateSongDto } from './DTO/update-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { DefaultValuePipe } from '@nestjs/common';

@Injectable()
export class SongsService {
  //local db
  //local array
  constructor(
    // Injects the Song repository into the service for database operations

    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.lyrics = songDTO.lyrics;

    song.releasedDate = new Date(songDTO.releasedDate);

    const [hours, minutes] = songDTO.duration.split(':').map(Number);
    song.duration = new Date(); // Create a base date (today)
    song.duration.setHours(hours, minutes, 0, 0);

    console.log(songDTO.artists);

    // find all the artits on the based on ids
    // const artists = await this.artistsRepository.findByIds(songDTO.artists);
    // console.log(artists);
    // //set the relation with artist and songs
    // song.artists = artists;

    return this.songsRepository.save(song);
  }

  async findAll() {
    return await this.songsRepository.find();
  }
  async findOne(id: number) {
    return await this.songsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.songsRepository.delete(id);
  }
  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
