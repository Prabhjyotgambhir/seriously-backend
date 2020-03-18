import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Posts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.posts, {eager: false})
    user: User;
}