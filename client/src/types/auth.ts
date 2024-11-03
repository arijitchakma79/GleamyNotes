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

export interface SendVerificationEmail{
    message: string
}

export interface VerificationResponse {
    message?: string;        // Present when verification is successful
    error?: string;          // Present when an error occurs or the verification fails
}
