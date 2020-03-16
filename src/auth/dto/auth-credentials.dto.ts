import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength, Matches } from "class-validator";

export class AuthCredentialsDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
