import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as mongoose from 'mongoose';
import { User } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  // register
  register(registerAuthDto: RegisterAuthDto) {
    return 'This action adds a new auth';
  }

  // login
  login(loginAuthDto: LoginAuthDto) {
    return 'This action signin a user';
  }

}
