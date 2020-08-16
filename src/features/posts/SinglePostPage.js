import React from "react";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { selectPostById } from "./postsSlice";

function SinglePostPage({ match }) {
  const { postId } = match.params;
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container">
          {post ? (
            <>
              <p className="title is-3">{post.title}</p>
              <p className="subtitle is-5">
                <PostAuthor userId={post.user} /> <TimeAgo date={post.date} />
              </p>
              <p className="subtitle is-5">{post.content}</p>
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
