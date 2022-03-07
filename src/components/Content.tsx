import { Post, User } from "@prisma/client";
import axios from "axios";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../lib/constants";
import PostForm from "./PostForm";

type ResData = { ok: boolean; posts: (Post & { user: User })[] };

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
              <StyledCard key={post.id}>
                <div className="name">{post.user.name}</div>
                <div className="message">{post.message}</div>
              </StyledCard>
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

const StyledCard = styled.div`
  padding: 2rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .name {
    border-bottom: 1px solid #f2f2f2;
  }

  .message {
    margin-top: 1rem;
    font-size: 1.3rem;
  }
`;

const StyledList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
