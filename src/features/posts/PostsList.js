import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostsList() {
  const posts = useSelector((state) => state.posts);
  const renderedPosts = posts.map(({ title, body, id }) => (
    <article className="notification" key={id}>
      <strong>{title}</strong>
      <p>{body}</p>
      <div className="buttons mt-2">
        <Link className="button" to={`/post/${id}`}>
          View Post
        </Link>
        <Link className="button" to={`/editPost/${id}`}>
          Edit Post
        </Link>
      </div>
    </article>
  ));

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Posts</h1>
        {renderedPosts}
      </div>
    </section>
  );
}

export default PostsList;
