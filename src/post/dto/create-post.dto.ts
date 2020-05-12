import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    categoryId: number;

    imagePath: string;
    
    @IsNotEmpty()
    image: string;

    createdAt: Date;
}