import { IsNotEmpty } from 'class-validator';

export class CreateEnquiryDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    query: string;

    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    contact: number;

    createdAt: Date;
}