import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () =>
    Logger.log('App is running at 3000', 'NESTJS-API-POC'),
  );
}
bootstrap();
