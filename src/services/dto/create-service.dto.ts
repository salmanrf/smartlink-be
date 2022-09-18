import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Cuci + Setrika' })
  name: string;

  @IsString()
  @MaxLength(10)
  @IsIn(['kg', 'pcs', 'cm', 'm2'])
  @ApiProperty({ examples: ['kg', 'pcs', 'cm', 'm2'] })
  unit: string;

  @IsNumberString()
  @ApiProperty({ example: '5000' })
  price: string;

  user_uuid: string;
}
