import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const onTitleChange = (evt) => setTitle(evt.target.value);
  const onUserChange = (evt) => setUser(evt.target.value);
  const onContentChange = (evt) => setContent(evt.target.value);

  const completedForm = [title, user, content].every(Boolean);
  const canSubmit = completedForm && addRequestStatus === "idle";

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!canSubmit) return;
    try {
      setAddRequestStatus("pending");
      const resultAction = await dispatch(addNewPost({ title, user, content }));
      unwrapResult(resultAction);
      setTitle("");
      setUser("");
      setContent("");
    } catch (err) {
      console.error("Failed to save new post", err);
    } finally {
      setAddRequestStatus("idle");
    }
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
              <button
                className={`button is-link ${
                  addRequestStatus === "pending" && "is-loading"
                }`}
                title={`${!canSubmit ? "Disabled button" : ""}`}
                disabled={!canSubmit}
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
