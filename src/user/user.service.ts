import { Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  async create(createUserDto: Partial<User>) {
    try {
      const { username, phone, full_name, password } = createUserDto;

      const user = await this.userRepo.save(
        {
          username,
          phone,
          full_name,
          password,
        },
        { reload: false },
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(attrs: Partial<Omit<User, 'humanizeUuid'>>) {
    try {
      const user = await this.userRepo.findOne({ where: attrs });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(user_uuid: string, updateUserDto: UpdateUserDto) {
    try {
      const updated = await this.userRepo.update(
        {
          uuid: user_uuid,
        },
        {
          ...updateUserDto,
        },
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }
}
