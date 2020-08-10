import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const onTitleChange = (evt) => setTitle(evt.target.value);
  const onAuthorChange = (evt) => setAuthor(evt.target.value);
  const onBodyChange = (evt) => setBody(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!title || !author || !body) return;
    dispatch(postAdded({ title, author, body, id: nanoid() }));
    setTitle("");
    setAuthor("");
    setBody("");
  };

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
              <button className="button is-link" type="submit">
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