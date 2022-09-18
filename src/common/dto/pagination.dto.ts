import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  @IsOptional()
  page_number?: string;

  @IsNumberString()
  @IsOptional()
  page_size?: string;

  @IsString()
  @IsOptional()
  sort_field?: string;

  @IsString()
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sort_order?: 'ASC' | 'DESC';
}
