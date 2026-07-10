import api from "./axios";

/*
========================================
Authentication
========================================
*/

export const registerUser = async (userData) => {

    const { data } = await api.post("/auth/register", userData);

    return data;

};

export const loginUser = async (userData) => {

    const { data } = await api.post("/auth/login", userData);

    return data;

};

export const logoutUser = async () => {

    const { data } = await api.post("/auth/logout");

    return data;

};

/*
========================================
Session
========================================
*/

export const refreshAccessToken = async () => {

    const { data } = await api.post("/auth/refresh-token");

    return data;

};

export const getCurrentUser = async () => {

    const { data } = await api.get("/auth/me");

    return data;

};