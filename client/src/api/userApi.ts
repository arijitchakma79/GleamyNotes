import axios from 'axios';
import { User } from '../types/user';
import { LoginResponse } from '../types/login';

export const login = async (email: string, password: string) : Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>('http://127.0.0.1:5000/login',{
        email,
        password
    });
    return response.data;
}