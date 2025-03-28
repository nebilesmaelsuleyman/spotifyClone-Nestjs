import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song-entity';
import { CreateSongDTO } from './DTO/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';

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
    (song.title = songDTO.title), (song.duration = songDTO.duration);
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.realeseDate;

    return await this.songsRepository.save(song);
  }

  async findAll() {
    return await this.songsRepository.find();
  }
}
