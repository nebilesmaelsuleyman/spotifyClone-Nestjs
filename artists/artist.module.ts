import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './artist-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';

@Module({
  // By using TypeOrmModule.forFeature([Artist]), we tell NestJS that
  //   this module needs access to the Artist entity's repository.
  //This allows us to inject the repository (Repository<Artist>)
  //   into services within this module.

  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
