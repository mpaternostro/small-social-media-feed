import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated, selectPostById } from "./postsSlice";

function EditPostForm({ match, history }) {
  const { postId } = match.params;
  const originalPost = useSelector((st) => selectPostById(st, postId));
  const users = useSelector((st) => st.users);

  const [title, setTitle] = useState(originalPost.title);
  const [user, setUser] = useState(originalPost.user);
  const [content, setContent] = useState(originalPost.content);
  const dispatch = useDispatch();

  const onTitleChange = (evt) => setTitle(evt.target.value);
  const onUserChange = (evt) => setUser(evt.target.value);
  const onContentChange = (evt) => setContent(evt.target.value);

  const incompleteForm = !title || !user || !content;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (incompleteForm) return;
    dispatch(postUpdated({ title, user, content, id: postId }));
    history.push("/");
  };

  const renderedUsers = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
                <select onChange={onUserChange} value={user}>
                  <option></option>
                  {renderedUsers}
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
                value={content}
                onChange={onContentChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <div className="buttons">
                <button
                  className="button is-link"
                  title={`${incompleteForm ? "Disabled button" : ""}`}
                  disabled={incompleteForm}
                  type="submit"
                >
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
