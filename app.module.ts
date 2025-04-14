import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {} from './src/songs/song-entity';
import { LoggerMiddleware } from 'src/common/logger.middleware';
import { DataSource } from 'typeorm';
import { AuthModule } from './src/auth/auth.module';

import { UsersModule } from './src/users/users.module';
import { ArtistsModule } from './src/artists/artist.module';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions, typeOrmAsyncConfig } from 'db/data-source';
import { SeedsModule } from './src/seeds/seeds.module';
import configuration from 'src/config/configuration';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', 'env.production'],
      isGlobal: true,
      load: [configuration],
    }),
    SongsModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
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
