import { prisma } from "../../../lib/db";

import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: true;
  user: User;
};

interface ExtNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
    picture: string;
  };
}

export default async function handler(
  req: ExtNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, name, picture } = req.body;

    const user = await prisma.user.upsert({
      where: {
        email: req.body.email,
      },
      create: {
        email,
        name,
        picture,
      },
      update: {},
    });

    return res.json({
      ok: true,
      user,
    });
  }
}
