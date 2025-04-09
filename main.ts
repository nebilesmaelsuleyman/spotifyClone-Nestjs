import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedsService } from 'src/seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /**
   * You can enable the seeding here
   */
  const seedsService = app.get(SeedsService);
  await seedsService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
