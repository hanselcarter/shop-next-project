import { Product } from "../pages/api/products";

import { fetchJson } from "./api";

export const cms_url = process.env.CMS_URL;

export const getProducts = async (): Promise<Product[]> => {
  const products = (await fetchJson(`${cms_url}/products`)) as Product[];

  return products.map((product) => ({
    ...product,
    picture: { ...product.picture, url: `${cms_url}${product.picture.url}` },
  }));
};

export const getProduct = async (id: string): Promise<Product> => {
  const product = (await fetchJson(`${cms_url}/products/${id}`)) as Product;

  return {
    ...product,
    picture: { ...product.picture, url: `${cms_url}${product.picture.url}` },
  };
};
