import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "styled-components";
import { colors } from "../lib/constants";

const Navbar = () => {
  const { user } = useUser();

  return (
    <StyledHeader>
      <nav>
        <StyledRight>
          <StyledUser>{user?.name}</StyledUser>
          <Link passHref href="/api/auth/logout">
            <a className="logout">Logout</a>
          </Link>
        </StyledRight>
      </nav>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled.header`
  height: 64px;
  background-color: ${colors.primary};
  color: white;

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    width: 60%;
    margin: auto;

    .logout {
      /* margin-left: auto; */
      font-weight: bold;
      border-radius: 5px;
      background-color: white;
      color: ${colors.primary};
      padding: 0.5rem 1rem;
    }
  }
`;

const StyledUser = styled.div`
  /* margin-left: auto; */
`;

const StyledRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
