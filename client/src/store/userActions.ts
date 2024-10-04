import { createAction } from "@reduxjs/toolkit";
import { User } from "../types/user";

export const setUser = createAction<User>('user/setUser');
export const logout = createAction('user/logout');
export const setLoading = createAction<boolean>('user/setLoading');
export const setVerified = createAction<boolean>('user/setVerified');
export const setError = createAction<string | null>('user/setError');