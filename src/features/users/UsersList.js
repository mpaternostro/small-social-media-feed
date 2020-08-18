import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../../app/Spinner";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./usersSlice";

function UsersList() {
  const users = useSelector(selectAllUsers);
  const renderedUsers = (
    <ul>
      {users.map(({ id, firstName, lastName, username }) => (
        <li key={id} title={`${firstName} ${lastName}`}>
          <Link to={`/users/${id}`}>{username}</Link>
        </li>
      ))}
    </ul>
  );

  let content;
  if (users.length > 0) {
    content = renderedUsers;
  } else {
    content = <Spinner />;
  }

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Users</h1>
          <h2 className="subtitle">{content}</h2>
        </div>
      </div>
    </section>
  );
}

export default UsersList;
