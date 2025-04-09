import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true }) // Ensure the apiKey is unique
  apiKey: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;
  /**
   * A user can create many playLists
//    */
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
