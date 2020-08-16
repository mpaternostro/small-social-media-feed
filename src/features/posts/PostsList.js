import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { selectAllPosts, fetchPosts } from "./postsSlice";

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.status);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = sortedPosts.map(
    ({ title, content, id, user, date, reactions }) => (
      <article className="notification" key={id}>
        <p className="title is-4">{title}</p>
        <p className="subtitle is-6">
          <PostAuthor userId={user} /> <TimeAgo date={date} />
        </p>
        <p className="subtitle is-6">{content}</p>
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

  let content;

  if (postsStatus === "loading") {
    content = (
      <div className="level-item">
        <span className="icon has-text-info is-large">
          <i className="fas fa-spinner fa-pulse fa-3x"></i>
        </span>
      </div>
    );
  } else if (postsStatus === "success") {
    content = renderedPosts;
  } else if (postsStatus === "failed") {
    content = "Failed to load new posts";
  }

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus, dispatch]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Posts</h1>
        {content}
      </div>
    </section>
  );
}

export default PostsList;
