import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllNotifications,
  allNotificationsRead,
} from "./notificationsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { parseISO, formatDistanceToNow } from "date-fns";

function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const renderedNotifications = notifications.map(
    ({ id, date, message, user: userId, isNew }) => {
      const parsedDate = parseISO(date);
      const timeAgo = formatDistanceToNow(parsedDate);
      const { username } =
        users.find(({ id }) => id === userId) || "Unknown User";

      return (
        <article key={id} className={`notification ${isNew && "is-warning"}`}>
          <strong>{username}</strong> {message}
          <div>
            <em title={parsedDate}>{timeAgo} ago</em>
          </div>
        </article>
      );
    }
  );

  let content;
  if (notifications.length > 0) {
    content = renderedNotifications;
  } else {
    content = <h2 className="subtitle">You're up to date</h2>;
  }

  useEffect(() => {
    dispatch(allNotificationsRead());
  });

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Notifications</h1>
        <div className="container">{content}</div>
      </div>
    </section>
  );
}

export default NotificationList;
