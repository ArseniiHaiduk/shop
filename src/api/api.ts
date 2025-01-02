import { Product } from "../types";

const apiBase = "https://dummyjson.com/products/";

export async function fetchAllProducts(
  selectParams: string[]
): Promise<Product[]> {
  const response = await fetch(`${apiBase}?limit=0&select=${selectParams}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const { products } = await response.json();

  return products;
}
