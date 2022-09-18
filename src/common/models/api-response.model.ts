import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseModel {
  @ApiProperty({ example: 201 })
  code: number;

  @ApiProperty({ example: 'Success' })
  status: string;

  @ApiProperty({ example: 'User Registered Successfully.' })
  message: string;
}
