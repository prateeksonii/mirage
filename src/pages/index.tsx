import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const IndexPage = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    // TODO: Refactor to ensure user is saved
    axios
      .post<User>("/api/users", {
        email: user.email,
        name: user.name,
        picture: user.picture,
      })
      .catch((err) => console.log(err));
    router.replace("/app");
  }

  return (
    <>
      <Head>
        <title>Mirage</title>
      </Head>
      <StyledPage>
        <Container>
          <Left>
            <h1>Mirage</h1>
            <p>share your experience across the world</p>
            <Link href="/api/auth/login" passHref>
              <a>Get started</a>
            </Link>
          </Left>
        </Container>
      </StyledPage>
    </>
  );
};

export default IndexPage;

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.54),
      rgba(255, 255, 255, 0.54)
    ),
    url(/assets/images/hero-bg.jpg);
`;

const Container = styled.div`
  width: 60%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  height: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  justify-content: center;

  h1 {
    font-size: 4rem;
    font-weight: 900;
  }

  p {
    font-size: 2rem;
    font-weight: 100;
  }

  a {
    margin-top: 2rem;
    background: #563eb2;
    color: white;
    width: max-content;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
