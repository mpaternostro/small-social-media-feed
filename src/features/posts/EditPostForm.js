import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "./postsSlice";

function EditPostForm({ match, history }) {
  const { postId } = match.params;
  const originalPost = useSelector((st) =>
    st.posts.find(({ id }) => id === postId)
  );
  const [title, setTitle] = useState(originalPost.title);
  const [author, setAuthor] = useState(originalPost.author);
  const [body, setBody] = useState(originalPost.body);
  const dispatch = useDispatch();

  const onTitleChange = (evt) => setTitle(evt.target.value);
  const onAuthorChange = (evt) => setAuthor(evt.target.value);
  const onBodyChange = (evt) => setBody(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!title || !author || !body) return;
    dispatch(postUpdated({ title, author, body, id: postId }));
    history.push("/");
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Edit Post</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Post Title:</label>
            <div className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="What's on your mind?"
                value={title}
                onChange={onTitleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Author:</label>
            <div className="control">
              <div className="select">
                <select onChange={onAuthorChange} value={author}>
                  <option></option>
                  <option>Charly</option>
                  <option>Ringo</option>
                  <option>Marce</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Description:</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="2"
                value={body}
                onChange={onBodyChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <div className="buttons">
                <button className="button is-link" type="submit">
                  Submit
                </button>
                <button className="button is-link" onClick={history.goBack}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditPostForm;
