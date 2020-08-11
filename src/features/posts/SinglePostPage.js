import React from "react";
import { useSelector } from "react-redux";

function SinglePostPage({ match }) {
  const { postId } = match.params;
  const post = useSelector((st) => st.posts.find(({ id }) => id === postId));

  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container">
          {post ? (
            <>
              <h1 className="title">{post.title}</h1>
              <h2 className="subtitle">{post.body}</h2>
            </>
          ) : (
            <h1 className="title">Post Not Found</h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default SinglePostPage;
