import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";

function PostAuthor({ userId }) {
  const user = useSelector((st) => selectUserById(st, userId));
  const author = `by ${user.name}`;

  return <em>{author}</em>;
}

export default React.memo(PostAuthor);
