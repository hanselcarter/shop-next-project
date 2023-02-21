import { fetchJson } from "@/lib/api";
import type { NextApiRequest, NextApiResponse } from "next";

import { Product } from "./user";

const { CMS_URL } = process.env;

export interface Cart {
  id: string;
  product: Product;
  quantity: number;
}

async function handlerPostCart(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.cookies.jwt as string;

  if (!auth) {
    res.status(401).end();
    return;
  }

  const { productId, quantity } = req.body;

  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth}` },
      body: JSON.stringify({ product: productId, quantity }),
    });

    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}

async function handlerGetCart(req: NextApiRequest, res: NextApiResponse<Cart>) {
  const auth = req.cookies.jwt as string;

  if (!auth) {
    res.status(401).end();
    return;
  }

  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${auth}` },
    });

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(401).end();
  }
}

async function handlerCart(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await handlerGetCart(req, res);
    case "POST":
      await handlerPostCart(req, res);
  }
}

export default handlerCart;
