import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logOutUser,
  refreshUser,
  changeTheme,
} from './operations';

const handleFulfilledRegister = (state, action) => {
  state.user.name = action.payload.user.name;
  state.user.email = action.payload.user.email;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isLoading = false;
};

const handlePendingRegister = state => {
  state.isLoading = true;
};

const handleRejectedRegister = state => {
  state.isLoading = false;
};

const handleFulfilledLogIn = (state, action) => {
  state.user.name = action.payload.user.name;
  state.user.email = action.payload.user.email;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isLoading = false;
};

const handlePendingLogIn = state => {
  state.isLoading = true;
};

const handleRejectedLogIn = state => {
  state.isLoading = false;
};

const handleFulfilledLogOut = state => {
  state.user = {
    name: '',
    email: '',
    avatar: '',
    id: '',
    userTheme: 'light',
  };
  state.token = '';
  state.isLoggedIn = false;
};

const handleFulfilledRefresh = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.isLoading = false;
};

const handlePendingRefresh = state => {
  state.isRefreshing = true;
  state.isLoading = true;
};

const handleRejectedRefresh = state => {
  state.isRefreshing = false;
  state.isLoading = false;
  state.isLoggedIn = false;
};

const handleFulfilledChangeTheme = (state, { payload }) => {
  state.user = payload;
  state.isLoading = false;
};

const handlePendingChangeTheme = state => {
  state.isLoading = true;
};

const handleRejectedChangeTheme = state => {
  state.isLoading = false;
};

const initialState = {
  user: { name: '', email: '', avatar: '', id: '', userTheme: 'light' },
  token: '',
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, handleFulfilledRegister)
      .addCase(registerUser.pending, handlePendingRegister)
      .addCase(registerUser.rejected, handleRejectedRegister)
      .addCase(loginUser.fulfilled, handleFulfilledLogIn)
      .addCase(loginUser.pending, handlePendingLogIn)
      .addCase(loginUser.rejected, handleRejectedLogIn)
      .addCase(logOutUser.fulfilled, handleFulfilledLogOut)
      .addCase(refreshUser.fulfilled, handleFulfilledRefresh)
      .addCase(refreshUser.pending, handlePendingRefresh)
      .addCase(refreshUser.rejected, handleRejectedRefresh)
      .addCase(changeTheme.fulfilled, handleFulfilledChangeTheme)
      .addCase(changeTheme.pending, handlePendingChangeTheme)
      .addCase(changeTheme.rejected, handleRejectedChangeTheme),
});

export const authReducer = authSlice.reducer;
