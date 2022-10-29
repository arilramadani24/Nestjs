import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable credentials for front-end
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // PORT Configuration
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  // Add Validation Pipe Globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Use CookieParser
  app.use(cookieParser());

  app.setGlobalPrefix('api')
  
  await app.listen(port);
}
bootstrap();
