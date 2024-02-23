import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as mongoose from 'mongoose';
import { User } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  // register
  async register(registerAuthDto: RegisterAuthDto): Promise<{token:string,user:object}> {
    const { email, password, name, phone } = registerAuthDto;
   
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException('User Already Register with this Email!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    const payload= {
      email: user.email,
      name:  user.name,
      id:user._id
    }

    const token = await this.jwtService.signAsync({sub:user._id, username:user.email})
    return {token,user:payload};
  }

  // login
  async login(loginAuthDto: LoginAuthDto):Promise<{token:string,user:object}> {
    const { email, password } = loginAuthDto;
   
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid){
      throw new UnauthorizedException('Invalid email or password');
    }
   
    const token = await this.jwtService.signAsync({sub:user._id, username:user.email});

    return {token, user:{email:user.email,name:user.name,id:user._id}};

    return;
  }
}
