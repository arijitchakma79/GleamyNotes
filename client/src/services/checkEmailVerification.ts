import { verify_email as verifyApi, check_user_is_verified as checkUserVerifiedApi } from "../api/authApi";


export const verify_email = async (email: string, code: string): Promise<boolean> => {
    try {
        const response = await verifyApi(email, code);
        if (response.message === "Verification successful"){
            return true;
        }
        else {
            return false;
        }
    } catch(err) {
        console.log('Verification Failed: ',err);
        return false;
    }
};

export const check_user_is_verified = async(email:string): Promise<boolean> => {
    try {
        const response = await checkUserVerifiedApi(email);
        if (response.message === "User is verified"){
            return true;
        }
        else {
            return false;
        }
    } catch(err){
        console.log('Verification Failed: ',err);
        return false
    }
}

