import { DatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/product/product.module';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Config } from './config/main.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    CategoryModule,
    ProductModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
