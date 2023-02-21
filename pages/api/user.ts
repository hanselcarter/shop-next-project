import type { NextApiRequest, NextApiResponse } from "next";
import { fetchJson } from "../../lib/api";
import { User } from "./login";

const { CMS_URL } = process.env;

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: {
    url: string;
  };
}

async function handlerUser(req: NextApiRequest, res: NextApiResponse<User>) {
  const auth = req.cookies.jwt as string;

  if (!auth) {
    res.status(401).end();
    return;
  }

  try {
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${auth}` },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).end();
  }
}

export default handlerUser;
