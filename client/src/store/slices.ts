import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, signup as signupApi} from '../api/authApi';
import {verify_email} from '../services/checkEmailVerification'; 
import { UserState } from '../types/user'; 


const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
  verified: localStorage.getItem('verified') === 'true',
  authenticated: localStorage.getItem('isAuthenticated') === 'true',
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userData = await loginApi(credentials.email, credentials.password);
      localStorage.setItem('token', userData.token); 
      localStorage.setItem('username', userData.user.username);
      localStorage.setItem('isAuthenticated', 'true');
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

export const logoutUser = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('verified');
  return null;
})

export const verifyUser = createAsyncThunk(
  'user/verify_email',
  async (user_info: { email: string; code: string }, { rejectWithValue }) => {
    try {
      const isVerified = await verify_email(user_info.email, user_info.code);
      if (isVerified) {
        localStorage.setItem('isAuthenticated', 'true');
        return true; 
      } else {
        return rejectWithValue('Verification failed. Please check your code.');
      }
    } catch (error: any) {
      return rejectWithValue('An error occurred during email verification.');
    }
  }
);



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

    // Verify User Reducer
  builder
  .addCase(verifyUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(verifyUser.fulfilled, (state) => {
    state.loading = false;
    state.verified = true; 
    state.error = null;
    state.authenticated = true;
  })
  .addCase(verifyUser.rejected, (state, action) => {
    state.loading = false;
    state.verified = false;
    state.error = action.payload as string;
  });
  },
});

export const { setVerified, setAuthenticated, clearError } = authSlice.actions;
export default authSlice.reducer;
