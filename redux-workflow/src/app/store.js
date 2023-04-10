import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from "../features/user/UserSlice"
import { adminSlice } from '../features/admin/AdminSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer
  },
});
