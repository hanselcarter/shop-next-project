import { getProducts } from "@/lib/products";
import type { NextApiRequest, NextApiResponse } from "next";

export interface Product {
  id: number;
  title: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
  const products = await getProducts();

  res.status(200).json(products);
}

export default handler;
