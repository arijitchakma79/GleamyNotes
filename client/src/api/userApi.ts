import axios from 'axios';
import { User } from '../types/user';
import { LoginResponse, SignUpResponse } from '../types/auth';

export const login = async (email: string, password: string) : Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>('http://127.0.0.1:5000/login',{
        email,
        password
    });
    return response.data;
}

export const signup = async(email: string, username: string, firstname: string, lastname: string, password:string): Promise<SignUpResponse> => {
    const response = await axios.post<SignUpResponse>('http://127.0.0.1:5000/signup', {
        email,
        username,
        firstname,
        lastname,
        password
    });
    return response.data;
}