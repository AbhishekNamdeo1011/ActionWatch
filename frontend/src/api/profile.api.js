import api from "./axios";

/*
========================================
Get Profile
========================================
*/

export const getProfile = async () => {

    const { data } = await api.get("/auth/me");

    return data.user;

};

/*
========================================
Update Profile
========================================
*/

export const updateProfile = async (payload) => {

    const { data } = await api.put(

        "/auth/profile",

        payload

    );

    return data.user;

};