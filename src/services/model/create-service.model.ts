import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/models/api-response.model';
import { Service } from '../entities/service.entity';

export class CreateServiceResponse extends ApiResponseModel {
  @ApiProperty()
  data: Service;
}
