import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindServiceDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  unit: string;
}
