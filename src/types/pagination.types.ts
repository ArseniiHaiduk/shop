export interface Pagination {
  limit: number;
  skip: number;
  next(): void;
  reset(): void;
}
