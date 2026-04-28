// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number; // Remember: store as cents (e.g., 1099 for $10.99) if using integers

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number; // We pass the ID to link it to a category
}