import axios from 'axios';
import { LoginResponse, SignUpResponse, SendVerificationEmail} from '../types/auth';

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

export const send_verification_email = async (email: string): Promise<void> => {
    const response = await axios.get(`http://127.0.0.5000/send_verification_email?email=${encodeURIComponent(email)}`);
    return response.data;
}
