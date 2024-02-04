import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { validationPipeConfig } from 'configs';
import { config } from 'dotenv';
import { HttpExceptionFilter } from 'filters';
import { AppModule } from './app.module';

async function bootstrap() {
  config()

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug'],
  });

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
