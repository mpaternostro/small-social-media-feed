import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    userId: 1,
    id: "1",
    author: "Ringo",
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: "2",
    author: "Charly",
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
      prepare(title, author, body) {
        return {
          payload: {
            id: nanoid(),
            title,
            author,
            body,
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { title, author, body, id } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.author = author;
        existingPost.body = body;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
