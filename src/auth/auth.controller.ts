import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/models/api-response.model';
import { LoginModel } from './models/login.model';
import { AuthorizedRequest } from './dto/authorized-request.dto';
import { JwtGuard } from 'src/guards/JwtGuard.guard';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const result = await this.authService.register(dto);

      const response: ApiResponse<null> = {
        code: 201,
        status: 'Success',
        message: 'Registered Successfully',
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.authService.login(dto);

      const response: ApiResponse<LoginModel> = {
        code: 200,
        status: 'Success',
        message: 'Registered Successfully',
        data: result,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('self')
  @UseGuards(JwtGuard)
  async getSelf(@Req() req: AuthorizedRequest) {
    const res: ApiResponse<LoginModel> = {
      code: 200,
      status: 'Success',
      message: 'Get self success.',
      data: req.user,
    };

    return res;
  }
}
