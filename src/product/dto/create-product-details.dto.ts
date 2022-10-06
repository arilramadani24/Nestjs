import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDetailsDto {
  @IsNotEmpty()
  id: string;

  processor: string;

  @IsOptional()
  motherboard: string;

  memory: string;

  storage: string;

  graphics: string;

  @IsOptional()
  casing: string;
}
