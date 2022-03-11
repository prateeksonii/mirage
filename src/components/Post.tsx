import { useUser } from "@auth0/nextjs-auth0";
import { Post as PostModel, User } from "@prisma/client";
import axios from "axios";
import { FC, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

import { colors } from "../lib/constants";

type PostProps = {
  post: { post: PostModel & { user: User }; isLiked: boolean };
};

const PostModel: FC<PostProps> = ({ post }) => {
  const { user } = useUser();

  const [likes, setLikes] = useState(post.post.likes);
  const [likeable, setLikeable] = useState(!post.isLiked);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleLike = (id: number) => {
    if (!likeable) return;
    axios.post(`/api/posts/like/${id}`);
    setLikes(likes + 1);
    setLikeable(false);
  };

  const handleUnlike = (id: number) => {
    if (likeable) return;
    axios.post(`/api/posts/unlike/${id}`);
    setLikes(likes - 1);
    setLikeable(true);
  };

  const onFollow = (id: number) => {
    axios.post(`/api/users/follow`, {
      userId: id,
    });
    setIsFollowed(true);
  };

  const onUnFollow = (id: number) => {
    axios.post(`/api/users/unfollow`, {
      userId: id,
    });
    setIsFollowed(false);
  };

  return (
    <StyledCard>
      <StyledHeader>
        <div className="name">{post.post.user.name}</div>
        {post.post.user.email !== user?.email && !isFollowed ? (
          <button onClick={() => onFollow(post.post.user.id)}>+ Follow</button>
        ) : (
          <button onClick={() => onUnFollow(post.post.user.id)}>
            - Unfollow
          </button>
        )}
      </StyledHeader>
      <div className="message">{post.post.message}</div>
      <br />
      <StyledFooter>
        {!likeable ? (
          <AiFillHeart onClick={() => handleUnlike(post.post.id)} />
        ) : (
          <AiOutlineHeart onClick={() => handleLike(post.post.id)} />
        )}{" "}
        {likes}
      </StyledFooter>
    </StyledCard>
  );
};

export default PostModel;

const StyledCard = styled.div`
  padding: 2rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .message {
    margin-top: 1rem;
    font-size: 1.3rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
  padding: 0.5rem 0;

  .name {
  }

  button {
    background: none;
    border: none;
    color: ${colors.primary};
    font-size: 1rem;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
