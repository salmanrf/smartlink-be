import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ApiResponse } from 'src/common/models/api-response.model';
import { Service } from './entities/service.entity';
import { JwtGuard } from 'src/guards/JwtGuard.guard';
import { FindServiceDto } from './dto/find-service.dt';
import { PaginationModel } from 'src/common/models/pagination.model';

@Controller('layanan')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createServiceDto: CreateServiceDto) {
    const result = await this.servicesService.create(createServiceDto);

    const response: ApiResponse<Service> = {
      code: 201,
      status: 'Success',
      message: 'Service Created Successfully',
      data: result,
    };

    return response;
  }

  @Get()
  async findAll(@Query() dto: FindServiceDto) {
    try {
      const result = await this.servicesService.findAll(dto);

      const response: ApiResponse<PaginationModel<Service>> = {
        code: 200,
        status: 'Success',
        message: 'Find Services success.',
        data: result,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
