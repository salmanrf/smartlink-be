import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationModel } from 'src/common/models/pagination.model';
import {
  getPaginatedData,
  getPaginationParams,
} from 'src/common/utils/pagination.utils';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { FindServiceDto } from './dto/find-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { FindServiceModel } from './model/find-service.model';

@Injectable()
export class ServicesService {
  @InjectRepository(Service)
  serviceRepo: Repository<Service>;

  async create(createServiceDto: CreateServiceDto) {
    try {
      const { price, ...createInput } = createServiceDto;

      const newService = await this.serviceRepo.save(
        {
          ...createInput,
          price: +price,
        },
        { reload: false },
      );

      return newService as Service;
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: FindServiceDto): Promise<FindServiceModel> {
    try {
      const { name, unit, page_number, page_size } = dto;
      let { sort_field, sort_order } = dto;
      const sqb = this.serviceRepo.createQueryBuilder('s');

      const { limit, offset } = getPaginationParams(+page_number, +page_size);

      if (name) {
        sqb.andWhere('name LIKE :name', { name: `%${name}%` });
      }
      if (unit) {
        sqb.andWhere({ unit });
      }

      console.log('limit', limit);
      console.log('offset', offset);

      sqb.take(limit);
      sqb.skip(offset);

      const SORT_FIELDS = ['created_at', 'name', 'unit', 'price'];

      if (!SORT_FIELDS.includes(sort_field)) {
        sort_field = 'created_at';
      }

      sqb.addOrderBy(sort_field, sort_order);

      const results = await sqb.getManyAndCount();

      const data = getPaginatedData(results, {
        page_number,
        page_size,
        sort_field,
        sort_order,
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
