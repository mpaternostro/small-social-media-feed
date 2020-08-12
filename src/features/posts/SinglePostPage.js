import React from "react";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function SinglePostPage({ match }) {
  const { postId } = match.params;
  const post = useSelector((st) => st.posts.find(({ id }) => id === postId));

  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container">
          {post ? (
            <>
              <p className="title is-3">{post.title}</p>
              <p className="subtitle is-5">
                <PostAuthor userId={post.userId} /> <TimeAgo date={post.date} />
              </p>
              <p className="subtitle is-5">{post.body}</p>
              <ReactionButtons
                userReactions={post.reactions}
                postId={post.id}
              />
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
