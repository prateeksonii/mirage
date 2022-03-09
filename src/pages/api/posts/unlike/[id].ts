import { prisma } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";

type ResBody = {
  ok: boolean;
  message?: string;
};

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResBody>
) {
  if (req.method === "POST") {
    const { id: postId } = req.query;

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

    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        likedBy: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "Post not found",
      });
    }

    await prisma.post.update({
      where: {
        id: +postId,
      },
      include: {
        likedBy: true,
      },
      data: {
        likedBy: {
          disconnect: {
            id: userInDb.id,
          },
        },
        likes: {
          decrement: 1,
        },
      },
    });

    return res.json({
      ok: true,
    });
  }
});
