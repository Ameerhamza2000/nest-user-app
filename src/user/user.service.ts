import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const isEmailExist= await this.userModel.findOne({email:createUserDto.email})
    if(isEmailExist){
      throw new BadRequestException('User already Register with this email')
    }
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  // get all users
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // get one user
  async findOne(id: string): Promise<User> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please enter correct id');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please enter correct id');
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // delete user
  async remove(id: string): Promise<User> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please enter correct id');
    }
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
