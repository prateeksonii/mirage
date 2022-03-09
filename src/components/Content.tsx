import { User, Post as PostModel } from "@prisma/client";
import axios from "axios";
import styled from "styled-components";
import useSWR from "swr";
import PostForm from "./PostForm";
import Post from "./Post";

type ResData = {
  ok: boolean;
  posts: { post: PostModel & { user: User }; isLiked: boolean }[];
};

const fetcher = (url: string) => axios.get<ResData>(url);

const Content: React.FC = () => {
  const { data: res } = useSWR("/api/posts", fetcher);

  return (
    <div>
      <PostForm />

      <StyledListContainer>
        <h2>All messages</h2>
        <StyledList>
          {!res ? (
            <div>Loading...</div>
          ) : (
            res.data.posts.map((post) => (
              <Post key={post.post.id} post={post} />
            ))
          )}
        </StyledList>
      </StyledListContainer>
    </div>
  );
};

export default Content;

const StyledListContainer = styled.div`
  margin-top: 2rem;
`;

const StyledList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
