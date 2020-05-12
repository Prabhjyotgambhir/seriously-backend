import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../auth/user.entity";
import { Category } from "../category/category.entity";

@Entity()
export class Posts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    categoryId: number;

    @Column()
    userId: number;

    @Column()
    image: string;

    @Column()
    imagePath: string;

    @Column()
    createdAt: Date;

    @ManyToOne(type => User, user => user.posts, {eager: false})
    user: User;

    @ManyToOne(type => Category, category => category.posts, {eager: true})
    category: Category;
}