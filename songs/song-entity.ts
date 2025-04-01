import { Artist } from 'src/artists/artist-entity';
import { Playlist } from 'src/playlist/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  //   @Column('varchar', { array: true })
  //   artists: string[];

  @Column({ type: 'date', nullable: true })
  releasedDate: Date;

  @Column({ type: 'time', nullable: true })
  duration: Date;

  @Column({ nullable: true })
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
}
