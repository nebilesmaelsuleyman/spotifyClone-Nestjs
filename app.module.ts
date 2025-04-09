import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { Song } from 'src/songs/song-entity';
import { Artist } from 'src/artists/artist-entity';
import { User } from 'src/users/user-entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artist.module';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from 'db/data-source';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ArtistsModule,

    SeedsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private datasource: DataSource) {
    console.log('dbName', datasource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs'); // option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option 2
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option 3
  }
}
