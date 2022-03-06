import { prisma } from "../../../lib/db";

import { Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";

type Data = {
  ok: boolean;
  post?: Post;
  message?: string;
};

interface ExtNextApiRequest extends NextApiRequest {
  body: {
    message: string;
  };
}

export default withApiAuthRequired(async function handler(
  req: ExtNextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message } = req.body;

  const { user } = getSession(req, res) as { user: UserProfile };

  const userInDb = await prisma.user.findUnique({
    where: {
      email: user.email!,
    },
  });

  if (!userInDb) {
    return res.status(404).json({
      ok: false,
      message: "User not found",
    });
  }

  const post = await prisma.post.create({
    data: {
      message,
      userId: userInDb.id,
    },
  });

  return res.json({
    ok: true,
    post,
  });
});
