import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult, In } from 'typeorm';
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
import { Artist } from 'src/artists/artist-entity';

@Injectable()
export class SongsService {
  //local db
  //local array
  constructor(
    // Injects the Song repository into the service for database operations

    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.lyrics = songDTO.lyrics;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;

    console.log(songDTO.artists);

    // find all the artits on the based on ids
    const artists = await this.artistsRepository.findByIds(songDTO.artists);
    console.log('this is artists id or name ', artists);
    // //set the relation with artist and songs
    song.artists = artists;

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
