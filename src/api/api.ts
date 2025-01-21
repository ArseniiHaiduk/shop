import { Product } from "../types/product.types";

const apiBase = "https://dummyjson.com/products/";

export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(`${apiBase}?limit=0`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const { products } = await response.json();

  return products;
}
