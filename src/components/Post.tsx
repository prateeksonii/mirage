import { Post as PostModel, User } from "@prisma/client";
import axios from "axios";
import { FC, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

type PostProps = {
  post: { post: PostModel & { user: User }; isLiked: boolean };
};

const PostModel: FC<PostProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.post.likes);
  const [likeable, setLikeable] = useState(!post.isLiked);

  const handleLike = async (id: number) => {
    if (!likeable) return;
    axios.post(`/api/posts/like/${id}`);
    setLikes(likes + 1);
    setLikeable(false);
  };

  const handleUnlike = async (id: number) => {
    if (likeable) return;
    axios.post(`/api/posts/unlike/${id}`);
    setLikes(likes - 1);
    setLikeable(true);
  };

  return (
    <StyledCard>
      <div className="name">{post.post.user.name}</div>
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

  .name {
    border-bottom: 1px solid #dddddd;
  }

  .message {
    margin-top: 1rem;
    font-size: 1.3rem;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
