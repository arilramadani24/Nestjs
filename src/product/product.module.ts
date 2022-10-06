import { CategoryService } from './../category/category.service';
import { Details } from './../entities/details.entity';
import { Products } from './../entities/product.entity';
import { Category } from './../entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category, Details])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
