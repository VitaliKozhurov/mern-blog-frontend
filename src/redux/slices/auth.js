import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
   const { data } = await axios.post('/auth/login', params);
   return data;
})

const initialState = {
   data: null,
   status: 'loading',
}


const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.data = null;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUserData.pending, (state) => {
         state.status = 'loading';
         state.data = null;
      });
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
         state.status = 'loaded';
         state.data = action.payload;
      });
      builder.addCase(fetchUserData.rejected, (state) => {
         state.status = 'error';
         state.data = null;
      });
   }
})

export const { logout } = authSlice.actions;
export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;