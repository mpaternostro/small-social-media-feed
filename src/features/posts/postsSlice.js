import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const endpoint = "/fakeApi/posts";
  const response = await client.get(endpoint);
  return response.posts;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const endpoint = "/fakeApi/posts";
    const response = await client.post(endpoint, { post: initialPost });
    return response.post;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { title, userId, content, id } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.userId = userId;
        existingPost.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { desc, postId } = action.payload;
      const { reactions } = state.posts.find((post) => post.id === postId);
      if (reactions[desc]) {
        reactions[desc] += 1;
      } else {
        reactions[desc] = 1;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts.push(...action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find(({ id }) => id === postId);
