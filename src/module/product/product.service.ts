import { Category } from '../category/entity/category.entity';
import { Details } from './entity/details.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductDetailsDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto';
import { Products } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(Details) private detailsRepository: Repository<Details>,
  ) {}
  async create(createProductDto: CreateProductDto, category: Category) {
    const newProduct = await this.productRepository.save(createProductDto);

    category.products = [...category.products, newProduct];
    await this.categoryRepository.save(category);

    return newProduct;
  }

  findAll() {
    return this.productRepository.find({
      order: { id: 'ASC' },
      relations: ['details'],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'details'],
    });

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    product.product_name = updateProductDto.product_name;
    product.stock = updateProductDto.stock;
    product.price = updateProductDto.price;

    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return `Product with id: ${id} has deleted`;
  }

  async createProductDetails(
    id: string,
    createProductDetails: CreateProductDetailsDto,
  ) {
    const product = await this.findOne(id);

    const newDetails = this.detailsRepository.create(createProductDetails);
    const saveDetails = await this.detailsRepository.save(newDetails);
    product.details = saveDetails;

    return this.productRepository.save(product);
  }
}
