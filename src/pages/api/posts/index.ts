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
  posts?: { post: Post; isLiked: boolean }[];
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
  if (req.method === "POST") {
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
  } else if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        likedBy: true,
      },
    });

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

    const postsWithIsLiked = posts.map((post) => {
      const isLiked = !!post.likedBy.find((user) => user.id === userInDb.id);
      return {
        post,
        isLiked,
      };
    });

    return res.json({
      ok: true,
      posts: postsWithIsLiked,
    });
  }
});
