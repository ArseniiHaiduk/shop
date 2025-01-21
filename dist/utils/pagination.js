export const pagination = {
    limit: 15,
    skip: 0,
    next() {
        this.skip += this.limit;
    },
    reset() {
        this.skip = 0;
    },
};
