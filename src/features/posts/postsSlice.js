import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

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
      const { title, user, content, id } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.user = user;
        existingPost.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { desc, postId } = action.payload;
      const { reactions } = state.entities[postId];
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
      postsAdapter.upsertMany(state, action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((st) => st.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (st, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);

export const getPostsStatus = (st) => st.posts.status;
