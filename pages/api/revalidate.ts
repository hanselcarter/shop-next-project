import type { NextApiRequest, NextApiResponse } from "next";

async function handlerRevalidate(req: NextApiRequest, res: NextApiResponse) {
  const event = req.body;

  if (event === "product") {
    const id = event.entry.id;

    await Promise.all([res.revalidate("/"), res.revalidate(`/products/${id}`)]);
  }
  res.status(204).end();
}

export default handlerRevalidate;
