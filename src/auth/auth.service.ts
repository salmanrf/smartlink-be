import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { promiseTuplify } from 'src/common/utils/promise.utils';
import { jwtSign } from 'src/common/utils/jwt.utils';
import { LoginModel } from './models/login.model';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    try {
      const { username, name, phone, password } = registerDto;

      const existing = await this.userService.findOne({ username } as User);

      if (existing) {
        throw new BadRequestException('User already exists.');
      }

      const hash = await bcrypt.hash(password, 11);

      const newUser = await this.userService.create({
        username,
        phone,
        password: hash,
        full_name: name,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;

      const user = await this.userService.findOne({ username });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new BadRequestException('Invalid username/password.');
      }

      const session_uuid = uuidv4();

      const [jwt, error] = await promiseTuplify<string>(
        jwtSign({
          username,
          id: user.uuid,
          session_id: session_uuid,
          name: user.full_name,
        }),
      );

      if (error) {
        throw new InternalServerErrorException('Internal Server Error.');
      }

      await this.userService.update(user.uuid, { session_uuid });

      const data: LoginModel = {
        id: user.uuid,
        username: user.username,
        name: user.full_name,
        token: jwt,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
}
