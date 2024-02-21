import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNumber()
  phone: number;
}
