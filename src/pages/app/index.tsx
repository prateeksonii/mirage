import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content";
import styled from "styled-components";

const AppIndex = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <Head>
        <title>App - Mirage</title>
      </Head>
      <Navbar />
      <StyledGrid>
        <div></div>
        <Content />
        <div></div>
      </StyledGrid>
    </>
  );
};

export default withPageAuthRequired(AppIndex);

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto 60% auto;
`;
