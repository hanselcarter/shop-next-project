import { getProducts } from "@/lib/products";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "../../lib/api";

export interface Product {
  id: number;
  title: string;
  description: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | ApiError>
) {
  const products = await getProducts();

  res.status(200).json(products);
}

export default handler;
