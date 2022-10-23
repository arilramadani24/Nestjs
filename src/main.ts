import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Add Cookie-Parser
  app.use(cookieParser());

  // PORT Configuration
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  // Add Validation Pipe Globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
}
bootstrap();
