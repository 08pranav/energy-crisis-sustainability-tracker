import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    logout(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
