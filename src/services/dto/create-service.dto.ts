import { IsIn, IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(10)
  @IsIn(['kg', 'pcs', 'cm', 'm2'])
  unit: string;

  @IsNumberString()
  price: number;

  user_uuid: string;
}
