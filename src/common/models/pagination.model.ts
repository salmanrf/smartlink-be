import { ApiProperty } from '@nestjs/swagger';

export class PaginationModel<T> {
  @ApiProperty()
  total_items: number;

  @ApiProperty()
  page_number: number;

  @ApiProperty()
  page_size: number;

  @ApiProperty()
  sort_field?: string;

  @ApiProperty()
  sort_order?: string;

  @ApiProperty()
  items: T[];
}
