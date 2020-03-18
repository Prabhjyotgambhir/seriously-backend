import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {}

    public async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryRepository.find();
        return categories;
    }

    public async getCategoryById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne(id);
        if (!category) {
            throw new NotFoundException(`category with ${id} not found `);
        }
        return category;
    }

    public async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.createCategory(createCategoryDto);
    }

    public async deleteCategoryById(id: number): Promise<any> {
        const category = await this.getCategoryById(id);
        const result = await this.categoryRepository.delete({id: category.id});
        return result;
    }
}
