import { Repository, EntityRepository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    public logger = new Logger('Category');
    public async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { name } = createCategoryDto;
        const category = new Category();
        category.name = name;
        try {
            await category.save();
        } catch(error) {
            console.log(error);
            this.logger.error(`Error while creating a category`);
        }
        return category;
    }
}