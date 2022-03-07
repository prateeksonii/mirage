import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import { colors } from "../lib/constants";

const LeftBar: React.FC = () => {
  const { user } = useUser();

  return (
    <StyledSider>
      <h4>
        Welcome, <div className="username">{user?.name}</div>
      </h4>
      <br />

      <StyledMenu>
        <button className="active">Feed</button>
      </StyledMenu>
    </StyledSider>
  );
};

export default LeftBar;

const StyledSider = styled.aside`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    font-weight: 300;
    font-size: 1rem;

    .username {
      font-weight: 500;
      font-size: 1.5rem;
    }
  }
`;

const StyledMenu = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    border: none;
    padding: 0.5rem 1rem;
    background-color: inherit;
    text-align: left;
    font-size: 1rem;
    cursor: pointer;

    &:hover,
    &.active {
      cursor: auto;
      font-weight: bold;
      background-color: ${colors.primary};
      border-radius: 5px;
      color: white;
      transition: all 0.2s ease-out;
    }
  }
`;
