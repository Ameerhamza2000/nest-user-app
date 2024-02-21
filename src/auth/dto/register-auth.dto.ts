import { Optional } from "@nestjs/common";
import { IsEmail,  IsNotEmpty, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @Optional()
    phone: number;
}
