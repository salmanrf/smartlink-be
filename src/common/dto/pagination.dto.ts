import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  @IsOptional()
  page_number: number | string;

  @IsNumberString()
  @IsOptional()
  page_size: number | string;

  @IsString()
  @IsOptional()
  sort_field: string;

  @IsString()
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sort_order: 'ASC' | 'DESC';
}
