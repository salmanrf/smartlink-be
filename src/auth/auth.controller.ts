import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseModel } from 'src/common/models/api-response.model';
import { LoginResponse } from './models/login.model';
import { AuthorizedRequest } from './dto/authorized-request.dto';
import { JwtGuard } from 'src/guards/JwtGuard.guard';
import { SelfResponse } from './models/self.model';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    type: ApiResponseModel,
  })
  async register(@Body() dto: RegisterDto) {
    try {
      const result = await this.authService.register(dto);

      const response: ApiResponseModel = {
        code: 201,
        status: 'Success',
        message: 'User Registered Successfully.',
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @ApiResponse({
    type: LoginResponse,
  })
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.authService.login(dto);

      const response: LoginResponse = {
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
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get Current Logged in user from jwt.' })
  @ApiResponse({ type: SelfResponse })
  async getSelf(@Req() req: AuthorizedRequest) {
    const res: LoginResponse = {
      code: 200,
      status: 'Success',
      message: 'Get self success.',
      data: req.user,
    };

    return res;
  }
}
