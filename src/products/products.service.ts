import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAllProducts() {
    return await this.productRepository.find({
      relations: ['category'], // This tells TypeORM to fetch the attached category too
    });
  }

  async create(dto: CreateProductDto) {
    //Verify the category actually exists before creating the product
    const category = await this.categoryRepository.findOneBy({ id: dto.categoryId });
    if (!category) {
      throw new NotFoundException(`Category with ID #${dto.categoryId} not found`);
    }

    //Create and save the product
    const product = this.productRepository.create({
      ...dto,
      category: category, // Link the actual category entity here
    });
    
    return await this.productRepository.save(product);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    // .preload() is a TypeORM magic method. It finds the entity in the DB 
    // and instantly applies your DTO updates to it in memory.
    const product = await this.productRepository.preload({
      id: id,
      ...dto,
      // If the frontend sends a new categoryId, update the relation
      category: dto.categoryId ? { id: dto.categoryId } as Category : undefined,
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    // Re-use your findOne method to make sure it exists before deleting
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }
}