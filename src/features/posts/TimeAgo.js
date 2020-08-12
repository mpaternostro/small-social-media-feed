import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

function TimeAgo({ date }) {
  const parsedDate = parseISO(date);
  const postDate = formatDistanceToNow(parsedDate);
  const estimatedTime = `${postDate} ago`;

  return <span title={parsedDate}>{estimatedTime}</span>;
}

export default TimeAgo;
