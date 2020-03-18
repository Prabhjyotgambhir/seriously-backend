import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    private logger = new Logger('Category');
    constructor(private categoryService: CategoryService) {}

    @Get()
    getAllCategories(): Promise<Category[]> {
        this.logger.verbose(`Fetching all the categories`);
        return this.categoryService.getAllCategories();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        this.logger.verbose(`Creating a category`)
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get('/:id') 
    getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.getCategoryById(id);
    }

    @Delete('/:id') 
    deleteCategoryById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.categoryService.deleteCategoryById(id);
    }
}
