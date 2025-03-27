import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  //local db
  //local array

  private readonly songs: any[] = [];

  create(song: any): any[] {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
  findOne(id: number) {
    return this.songs[id];
  }
}
