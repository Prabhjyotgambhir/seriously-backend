import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Posts } from "src/post/posts.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string; 

    @Column()
    salt: string;

    @OneToMany(type => Posts, posts => posts.user, { eager: true })
    posts: Posts[];

    public async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}