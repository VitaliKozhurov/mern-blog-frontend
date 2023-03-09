import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   const { data } = await axios.get('/posts');
   return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
   axios.delete(`/posts/${id}`);
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
   const { data } = await axios.get('/tags');
   return data;
})

const initialState = {
   posts: {
      items: [],
      status: 'loading',
   },
   tags: {
      items: [],
      status: 'loading',
   },
}

const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducer: {},
   extraReducers: (builder) => {
      // Запрос статей
      builder.addCase(fetchPosts.pending, (state) => {
         state.posts.status = 'loading';
      });
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
         state.posts.status = 'loaded';
         state.posts.items = action.payload;
      });
      builder.addCase(fetchPosts.rejected, (state) => {
         state.posts.status = 'error';
         state.posts.items = [];
      });
      // Запрос тегов
      builder.addCase(fetchTags.pending, (state) => {
         state.tags.status = 'loading';
      });
      builder.addCase(fetchTags.fulfilled, (state, action) => {
         state.tags.status = 'loaded';
         state.tags.items = action.payload;
      });
      builder.addCase(fetchTags.rejected, (state) => {
         state.tags.status = 'error';
         state.tags.items = [];
      });
      // Удаление статей
      builder.addCase(fetchRemovePost.pending, (state, action) => {
         state.posts.items = state.posts.items.filter(el => el._id !== action.meta.arg);
      });
   }
})


export const postsReducer = postsSlice.reducer;