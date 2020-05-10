import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "../category/category.entity";

@Entity()
export class Banner extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    imagePath: string;

    @Column()
    image: string;

    @Column()
    categoryId: number;

    @Column()
    userId: number;

    @ManyToOne(type => Category, category => category.banner, {eager: true})
    category: Category;
}