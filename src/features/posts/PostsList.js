import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../app/Spinner";
import { selectPostIds, fetchPosts } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

function PostsList() {
  const dispatch = useDispatch();
  const orderedPostsIds = useSelector(selectPostIds);
  const postsStatus = useSelector((state) => state.posts.status);

  const renderedPosts = orderedPostsIds.map((postId) => (
    <PostExcerpt key={postId} postId={postId} />
  ));

  let content;

  if (postsStatus === "loading") {
    content = <Spinner />;
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
