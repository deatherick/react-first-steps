import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (thunkAPI) => {
      try {
        const response = await fetch(
          'https://dummyjson.com/users',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        let data = await response.json();
        console.log('data', data, response.status);
  
        if (response.status === 200) {
          return { ...data };
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
);

const initialState = {
    data: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
        return state;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllUsers.pending, (state) => {
          state.isFetching = true;
        })
        .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
          state.isFetching = false;
          state.isSuccess = true;
          state.data = payload.users;
        })
        .addCase(fetchAllUsers.rejected, (state) => {
          console.log('fetchAllUsers');
          state.isFetching = false;
          state.isError = true;
        })
      }
  });
  
  export const { clearState } = adminSlice.actions;
  
  export const adminSelector = (state) => state.admin;