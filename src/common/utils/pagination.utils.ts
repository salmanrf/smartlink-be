import { PaginationDto } from '../dto/pagination.dto';
import { PaginationModel } from '../models/pagination.model';

export function getPaginationParams(
  page_number: number,
  page_size: number,
): { limit: number; offset: number } {
  const limit = page_size || 10;
  const offset = (page_number || 1) === 1 ? 0 : (page_number - 1) * page_size;

  return { limit, offset };
}

export function getPaginatedData<T>(
  data: [T[], number],
  pagination_params: PaginationDto,
): PaginationModel<T> {
  const [items, total_items] = data;

  return {
    items,
    total_items,
    ...pagination_params,
    page_number: +pagination_params.page_number || 1,
    page_size: +pagination_params.page_size || 10,
  };
}
