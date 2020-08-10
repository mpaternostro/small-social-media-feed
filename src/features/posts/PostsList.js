import React from "react";
import { useSelector } from "react-redux";

function PostsList() {
  const posts = useSelector((state) => state.posts);
  const renderedPosts = posts.map(({ title, body, id }) => (
    <article className="notification" key={id}>
      <strong>{title}</strong>
      <p>{body}</p>
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
