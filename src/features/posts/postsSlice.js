import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    userId: "1",
    date: sub(new Date(), { hours: 1 }).toISOString(),
    reactions: { thumbsUp: 3 },
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: "2",
    userId: "2",
    date: sub(new Date(), { hours: 2, minutes: 30 }).toISOString(),
    reactions: {},
    title: "qui est esse",
    body:
      "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, userId, body) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            userId,
            body,
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { title, userId, body, id } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.userId = userId;
        existingPost.body = body;
      }
    },
    reactionAdded: (state, action) => {
      const { desc, postId } = action.payload;
      const { reactions } = state.find((post) => post.id === postId);
      if (reactions[desc]) {
        reactions[desc] += 1;
      } else {
        reactions[desc] = 1;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
