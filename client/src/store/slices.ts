import { createReducer } from '@reduxjs/toolkit';
import { UserState, User } from '../types/user';
import { setUser, logout, setLoading, setError, setVerified } from './userActions';

const initialState: UserState = {
    user: null,
    loading: false,
    verified: false,
    error: null,
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action)=> {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(logout, (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        })
        .addCase(setLoading, (state, action) => {
            state.loading = action.payload;
        })
        .addCase(setError, (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(setVerified, (state, action)=>{
            state.verified = action.payload;
        })
})

export default userReducer;
