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

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'Spotifyclone',
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'postgresspassword@123',
      entities: [Song, Artist, User],
      synchronize: true,
    }),
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
