import axios from "axios";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { colors } from "../lib/constants";

const PostForm: FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      await axios.post("/api/posts", {
        message,
      });

      toast.success("Your message is shared!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextArea
        placeholder="What's on your mind today?"
        value={message}
        onChange={handleChange}
      />
      <button type="submit">Post</button>
    </StyledForm>
  );
};

export default PostForm;

const StyledTextArea = styled.textarea`
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  background-color: inherit;
`;

const StyledForm = styled.form`
  background-color: #f5f5f5;
  margin-top: 2rem;
  position: relative;
  height: 100px;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 5px;

    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;
