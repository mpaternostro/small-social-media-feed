import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";

function UserPage({ match }) {
  const { userId } = match.params;
  const user = useSelector((st) => selectUserById(st, userId));
  const userPosts = useSelector((st) => selectPostsByUser(st, userId));

  const renderedPosts = userPosts.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/post/${id}`}>{title}</Link>
    </li>
  ));

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">{user.username}</h1>
        <ul>{renderedPosts}</ul>
      </div>
    </section>
  );
}

export default UserPage;
