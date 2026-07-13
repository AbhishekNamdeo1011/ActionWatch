import {
    loginUser,
    registerUser,
    logoutUser,
    googleLogin,
} from "@/api/auth.api";

export const registerService = async (formData) => {

    return await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
    });

};

export const loginService = async (formData) => {

    return await loginUser({
        email: formData.email,
        password: formData.password,
    });

};

export const logoutService = async () => {

    return await logoutUser();

};

export const googleLoginService = async (credential) => {

    return await googleLogin(

        credential

    );

};