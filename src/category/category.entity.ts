import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Posts } from "src/post/posts.entity";
import { Banner } from "src/banner/banner.entity";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Posts, posts => posts.category, {eager: false})
    posts: Posts[];

    @OneToMany(type => Banner, banner => banner.category, {eager: false})
    banner: Banner[];
}