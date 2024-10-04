export interface UserState {
    user: User | null;
    loading: boolean;
    verified: boolean;
    error: string | null;
    authenticated: boolean;
}

export interface User {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    isVerified: boolean;
}

