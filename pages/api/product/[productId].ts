import { getProduct } from "@/lib/products";
import type { NextApiRequest, NextApiResponse } from "next";

export interface Product {
  id: number;
  title: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Product>) {
  const { productId } = req.query;

  const product = await getProduct(productId as string);

  res.status(200).json(product);
}

export default handler;
