export class PaginationModel<T> {
  total_items: number;
  items: T[];
  page_number: number | string;
  page_size: number | string;
  sort_field: string;
  sort_order: string;
}
