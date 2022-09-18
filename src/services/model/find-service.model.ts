import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/models/api-response.model';
import { PaginationModel } from 'src/common/models/pagination.model';
import { Service } from '../entities/service.entity';

export class FindServiceResponse extends ApiResponseModel {
  data: FindServiceModel;
}

export class FindServiceModel extends PaginationModel<Service> {
  @ApiProperty()
  items: Service[];
}
