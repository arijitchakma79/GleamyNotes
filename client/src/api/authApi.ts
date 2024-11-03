import axios from 'axios';
import { LoginResponse, SignUpResponse, SendVerificationEmail, VerificationResponse} from '../types/auth';

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

export const send_verification_email = async (email: string): Promise<SendVerificationEmail> => {
    const response = await axios.post<SendVerificationEmail>(`http://127.0.0.1:5000/send_verification_email`, {
        email
    });
    return response.data;
}

export const verify_email = async (email: string, code: string): Promise<VerificationResponse> => {
    const response = await axios.post<VerificationResponse>(`http://127.0.0.1:5000/verify_email`, {
        email, 
        code
    });
    return response.data;
}

export const check_user_is_verified = async (email: string): Promise<VerificationResponse> => {
    const response = await axios.post<VerificationResponse>('http://127.0.0.1:5000/check_user_is_verified', {
        email
    });
    return response.data;
}