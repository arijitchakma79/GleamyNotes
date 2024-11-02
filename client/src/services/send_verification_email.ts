import { send_verification_email } from '../api/authApi'

export const sendVerificationEmailService = async (email: string): Promise<string> => {
    try {
        
        const response = await send_verification_email(email);
        console.log('Verification email response:', response);
        return `Verification email sent successfully to ${email}`;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email. Please try again later.');
    }
};