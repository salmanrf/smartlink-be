import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtGuard } from 'src/guards/JwtGuard.guard';
import { FindServiceDto } from './dto/find-service.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateServiceResponse } from './model/create-service.model';
import { FindServiceResponse } from './model/find-service.model';
import { AuthorizedRequest } from 'src/auth/dto/authorized-request.dto';

@Controller('layanan')
@ApiTags('layanan')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create New Service.' })
  @ApiCreatedResponse({
    description: 'Service has been created successfully.',
    type: CreateServiceResponse,
  })
  async create(
    @Req() req: AuthorizedRequest,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    createServiceDto.user_uuid = req.user.id;

    const result = await this.servicesService.create(createServiceDto);

    const response: CreateServiceResponse = {
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

      const response: FindServiceResponse = {
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
