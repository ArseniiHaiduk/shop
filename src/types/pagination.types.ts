export interface Pagination {
  limit: number;
  skip: number;
  select: string[];
  next(): void;
  reset(): void;
}
