import { fetchJson } from "@/lib/api";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export type User = {
  id: number;
  username: string;
  email: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: number;
    password: number;
  };
}

const { CMS_URL } = process.env;

async function handleLogin(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method !== "POST") {
    res.status(405).end();

    return;
  }

  const { email, password } = req.body;

  try {
    const response = await fetchJson(`${CMS_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    const user = response.user as User;
    const jwt = response.jwt as string;

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: true,
        })
      )
      .json(user);
  } catch (err) {
    res.status(401).end();
  }
}

export default handleLogin;
