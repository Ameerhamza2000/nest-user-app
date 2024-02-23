import { Optional } from "@nestjs/common";
import { IsEmail,  IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
  
    @Optional()
    phone: number;
}
