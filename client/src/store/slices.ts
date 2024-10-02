import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, User } from '../types/user';

const initialState: UserState = {
    user: null,
    loading: false,
    verified: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload;
        },
        setVerified(state, action: PayloadAction<boolean>){
            state.verified = action.payload;
        },
        setError(state, action: PayloadAction<string | null>){
            state.error = action.payload;
            state.loading = false;
        },
    }
})


export const { setUser, logout, setLoading, setVerified, setError } = userSlice.actions;
export default userSlice.reducer;
