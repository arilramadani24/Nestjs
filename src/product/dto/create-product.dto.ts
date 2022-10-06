import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => BigInt)
  price: number;

  image: string;

  @IsNotEmpty()
  categoryId: string;
}
