import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostExcerpt({ postId }) {
  const { title, content, id, user, date, reactions } = useSelector((st) =>
    selectPostById(st, postId)
  );

  return (
    <article className="notification">
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
  );
}

export default PostExcerpt;
