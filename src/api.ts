import { Product } from "./types/prodact-type";

const apiBase = "https://dummyjson.com/products/";

async function fetchAllProducts(selectParams: string[]): Promise<Product[]> {
  const response = await fetch(`${apiBase}?limit=0&select=${selectParams}`);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const { products } = await response.json();
  return products;
}

async function fetchProducts(skip: number, limit: number): Promise<Product[]> {
  const response = await fetch(`${apiBase}?skip=${skip}&limit=${limit}`);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const { products } = await response.json();
  return products;
}

export { fetchProducts, fetchAllProducts };
