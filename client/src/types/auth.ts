import { User } from "./user";

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface SignUpResponse{
    message: string;
    token: string;
    user: User;
}