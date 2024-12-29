import { Pagination } from "./types/pagination-type";

export const pagination: Pagination = {
  limit: 3,
  skip: 0,
  select: [
    "category",
    "description",
    "id",
    "price",
    "rating",
    "thumbnail",
    "title",
  ],
  next() {
    this.skip += this.limit;
  },
};
