import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/common/models/api-response.model';

export class SelfModel {
  @ApiProperty({ example: 'CA436877-36E6-11ED-A449-0242AC150002' })
  id: string;

  @ApiProperty({ example: 'Salman Rizqi Fatih' })
  name: string;

  @ApiProperty({ example: 'salmanrf' })
  username: string;
}

export class SelfResponse extends ApiResponseModel {
  @ApiProperty()
  data: SelfModel;
}
