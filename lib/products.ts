import { Product } from "../pages/api/products";

import { fetchJson } from "./api";

const cms_url = process.env.CMS_URL;

export const getProducts = async (): Promise<Product[]> => {
  const products = (await fetchJson(`${cms_url}/products`)) as Product[];

  return products;
};

export const getProduct = async (id: string): Promise<Product> => {
  const product = (await fetchJson(`${cms_url}/products/${id}`)) as Product;

  return product;
};
