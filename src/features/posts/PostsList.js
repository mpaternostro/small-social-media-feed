import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostsList() {
  const posts = useSelector((state) => state.posts);
  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = sortedPosts.map(
    ({ title, body, id, userId, date, reactions }) => (
      <article className="notification" key={id}>
        <p className="title is-4">{title}</p>
        <p className="subtitle is-6">
          <PostAuthor userId={userId} /> <TimeAgo date={date} />
        </p>
        <p className="subtitle is-6">{body}</p>
        <ReactionButtons userReactions={reactions} postId={id} />
        <div className="buttons mt-4">
          <Link className="button" to={`/post/${id}`}>
            View Post
          </Link>
          <Link className="button" to={`/editPost/${id}`}>
            Edit Post
          </Link>
        </div>
      </article>
    )
  );

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
