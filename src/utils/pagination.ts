import { Pagination } from "../types";

export const pagination: Pagination = {
  limit: 10,
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

  reset() {
    this.skip = 0;
  },
};
