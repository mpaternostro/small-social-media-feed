import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

function ReactionButtons({ userReactions, postId }) {
  const reactions = [
    ["thumbsUp", "👍"],
    ["hooray", "🎉"],
    ["heart", "❤️"],
    ["rocket", "🚀"],
    ["eyes", "👀"],
  ];
  const dispatch = useDispatch();
  const reactionList = reactions.map(([desc, emoji]) => {
    const count = userReactions[desc] || 0;
    const renderedEmoji = `${emoji} ${count}`;

    return (
      <button
        key={desc}
        title={desc}
        className="button mr-2"
        onClick={() => dispatch(reactionAdded({ desc, postId }))}
      >
        {renderedEmoji}
      </button>
    );
  });

  return <div>{reactionList}</div>;
}

export default ReactionButtons;
