import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

function handleLogOut(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        path: "/api",
        expires: new Date(0),
      })
    )
    .json({});
}

export default handleLogOut;
