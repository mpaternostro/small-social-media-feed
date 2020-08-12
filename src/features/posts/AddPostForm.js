import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((st) => st.users);

  const onTitleChange = (evt) => setTitle(evt.target.value);
  const onUserChange = (evt) => setUserId(evt.target.value);
  const onBodyChange = (evt) => setBody(evt.target.value);

  const incompleteForm = !title || !userId || !body;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (incompleteForm) return;
    dispatch(postAdded(title, userId, body));
    setTitle("");
    setUserId("");
    setBody("");
  };

  const renderedUsers = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Add New Post</h1>

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
                <select onChange={onUserChange} value={userId}>
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
                value={body}
                onChange={onBodyChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                title={`${incompleteForm ? "Disabled button" : ""}`}
                disabled={incompleteForm}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddPostForm;
