import { Pagination } from "../types/pagination.types";

export const pagination: Pagination = {
  limit: 15,
  skip: 0,

  next() {
    this.skip += this.limit;
  },

  reset() {
    this.skip = 0;
  },
};
