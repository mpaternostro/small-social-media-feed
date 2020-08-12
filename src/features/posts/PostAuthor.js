import React from "react";
import { useSelector } from "react-redux";

function PostAuthor({ userId }) {
  const user = useSelector((st) => st.users.find(({ id }) => id === userId));
  const author = `by ${user.name}`;

  return <em>{author}</em>;
}

export default PostAuthor;
