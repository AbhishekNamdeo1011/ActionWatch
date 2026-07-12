import api from "./axios";

/*
==========================================
Get All Users
==========================================
*/

export const getUsers = async () => {

    const { data } = await api.get("/users");

    return data.data;

};

export const updateUserRole = async (
    userId,
    role
) => {

    const { data } = await api.patch(

        `/users/${userId}/role`,

        { role }

    );

    return data.data;

};