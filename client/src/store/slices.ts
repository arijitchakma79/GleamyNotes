import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, signup as signupApi } from '../api/authApi'; 
import { UserState } from '../types/user'; 


const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  verified: false,
  authenticated: false,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userData = await loginApi(credentials.email, credentials.password);
      localStorage.setItem('token', userData.token); 
      console.log(userData)
      return userData.user;
    } catch (error: any) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userInfo: { email: string; username: string; firstname: string; lastname: string; password: string }, { rejectWithValue }) => {
    try {
      const userData = await signupApi(userInfo.email, userInfo.username, userInfo.firstname, userInfo.lastname, userInfo.password);
      localStorage.setItem('token', userData.token); 
      return userData.user;
    } catch (error: any) {
      return rejectWithValue('Signup failed. Please check your details.');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token'); 
  return null; 
});


const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setVerified: (state, action) => {
      state.verified = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login User Reducer
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.authenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Signup User Reducer
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.authenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout User Reducer
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.authenticated = false;
      state.loading = false;
    });
  },
});

export const { setVerified, setAuthenticated, clearError } = authSlice.actions;
export default authSlice.reducer;
