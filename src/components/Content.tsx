import { User, Post as PostModel } from "@prisma/client";
import axios from "axios";
import styled from "styled-components";
import useSWR from "swr";
import PostForm from "./PostForm";
import Post from "./Post";
import { useQuery } from "react-query";

type ResData = {
  ok: boolean;
  posts: { post: PostModel & { user: User }; isLiked: boolean }[];
};

const fetcher = (url: string) => axios.get<ResData>(url);

const Content: React.FC = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<{ post: PostModel & { user: User }; isLiked: boolean }[]>(
    "posts",
    async () => {
      const res = await axios.get("/api/posts");
      return res.data.posts;
    }
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <PostForm />

      <StyledListContainer>
        <h2>All messages</h2>
        <StyledList>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            posts!.map((post) => <Post key={post.post.id} post={post} />)
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
