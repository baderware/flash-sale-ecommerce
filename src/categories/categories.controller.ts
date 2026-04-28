// src/categories/categories.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  
  @Get()
  @ApiOperation({ summary: 'Public: Get all categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  
  @Get(':id')
  @ApiOperation({
    summary: 'Public: Get a specific category with its products',
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  
  @Post()
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin: Create a new category' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  
  @Patch(':id')
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin: Update a category' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, dto);
  }

  
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin: Delete a category' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}