import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () =>
    Logger.log(`App is running at ${port}`, 'NESTJS-API-POC'),
  );
}
bootstrap();
