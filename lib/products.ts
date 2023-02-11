import { Product } from "../pages/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:1337/products");

  const products = (await response.json()) as Product[];

  return products;
};