import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import {
  selectPostsByUser,
  getPostsStatus,
  fetchPosts,
} from "../posts/postsSlice";
import Spinner from "../../app/Spinner";

function UserPage({ match }) {
  const { userId } = match.params;
  const dispatch = useDispatch();
  const user = useSelector((st) => selectUserById(st, userId));
  const userPosts = useSelector((st) => selectPostsByUser(st, userId));
  const postsStatus = useSelector(getPostsStatus);

  const renderedPosts = userPosts.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/post/${id}`}>{title}</Link>
    </li>
  ));

  let content;
  if (userPosts.length > 0) {
    content = (
      <>
        <h1 className="title">{user.username}</h1>
        <ul>{renderedPosts}</ul>
      </>
    );
  } else if (!user) {
    content = <h1 className="title">User Not Found</h1>;
  } else {
    content = <Spinner />;
  }

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus, dispatch]);

  return (
    <section className="section">
      <div className="container">{content}</div>
    </section>
  );
}

export default UserPage;
