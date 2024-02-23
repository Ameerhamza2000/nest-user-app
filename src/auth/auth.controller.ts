import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../models/user.schema';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup controller
  @Post('signup')
  async signup(@Body() registerAuthDto: RegisterAuthDto): Promise<{token:string,user:object}> {
    return this.authService.register(registerAuthDto);
  }
  
  // login controller
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() loginAuthDto: LoginAuthDto):Promise<{token:string,user:object}> {
    return this.authService.login(loginAuthDto);
  }

 
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user
  }
}
