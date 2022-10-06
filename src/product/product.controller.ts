import { CategoryService } from './../category/category.service';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );

    return await this.productService.create(createProductDto, category);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Post(':id/details')
  createProductDetails(
    @Param('id') id: string,
    @Body() createProductDetailsDto: CreateProductDetailsDto,
  ) {
    return this.productService.createProductDetails(
      id,
      createProductDetailsDto,
    );
  }
}
