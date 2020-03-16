import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password } = authCredentialsDto;
        const user = new User();

        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(user.salt, password);

        try {
            await user.save();
        } catch(error) {
            // DUPLICATE EMAIL ID
            if (error.code === 'SQLITE_CONSTRAINT') {
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private hashPassword(salt: string, password: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    public async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({email});
        
        if (user && await user.validatePassword(password)) {
            return user.email
        } else {
            return null;
        }
    }
}