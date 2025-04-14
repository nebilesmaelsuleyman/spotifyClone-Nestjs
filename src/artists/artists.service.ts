import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist-entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>,
  ) {}

  async findArtist(userId: number): Promise<any> {
    const artist = await this.artistRepo.findOneBy({ user: { id: userId } });

    return artist || null;
  }
}
