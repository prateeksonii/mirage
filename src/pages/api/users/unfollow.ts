import { prisma } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";

type Data = {
  ok: true;
};

interface ExtNextApiRequest extends NextApiRequest {
  body: {
    userId: number;
  };
}

export default withApiAuthRequired(async function handler(
  req: ExtNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { userId } = req.body;

    const { user } = getSession(req, res) as { user: UserProfile };

    await prisma.user.update({
      where: {
        email: user.email!,
      },
      include: {
        following: true,
      },
      data: {
        following: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return res.json({
      ok: true,
    });
  }
});
