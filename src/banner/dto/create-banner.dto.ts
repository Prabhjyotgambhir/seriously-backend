import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    categoryId: number;

    imagePath: string;
    
    @IsNotEmpty()
    image: string;
}