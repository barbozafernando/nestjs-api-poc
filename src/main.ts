import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from './config/postgres-data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dataSource
    .initialize()
    .then(() => Logger.log('Data Source has been initialized', 'DataSource'))
    .catch(() => Logger.log('Error initializing Data Source', 'DataSource'));

  await app.listen(3000, () => Logger.log('App is running at 3000', 'POC'));
}
bootstrap();
