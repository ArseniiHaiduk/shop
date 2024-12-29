export type Pagination = {
  limit: number;
  skip: number;
  select: string[];
  next(): void;
};
