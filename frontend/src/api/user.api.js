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