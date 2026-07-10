import axios from "axios";

import { getToken, setToken, clearToken } from "@/lib/tokenManager";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error, token = null) => {

    failedQueue.forEach((promise) => {

        if (error) {

            promise.reject(error);

        } else {

            promise.resolve(token);

        }

    });

    failedQueue = [];

};

api.interceptors.request.use(

    (config) => {

        const token = getToken();

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (!originalRequest) {

            return Promise.reject(error);

        }

        // Don't try to refresh if refresh endpoint itself failed
        if (originalRequest.url?.includes("/auth/refresh-token")) {

            clearToken();

            return Promise.reject(error);

        }

        if (

            error.response?.status !== 401 ||

            originalRequest._retry

        ) {

            return Promise.reject(error);

        }

        if (isRefreshing) {

            return new Promise((resolve, reject) => {

                failedQueue.push({

                    resolve,

                    reject,

                });

            }).then((token) => {

                originalRequest.headers.Authorization = `Bearer ${token}`;

                return api(originalRequest);

            });

        }

        originalRequest._retry = true;

        isRefreshing = true;

        try {

            const { data } = await axios.post(

                `${import.meta.env.VITE_API_URL}/auth/refresh-token`,

                {},

                {

                    withCredentials: true,

                }

            );

            setToken(data.accessToken);

            processQueue(null, data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            return api(originalRequest);

        }

        catch (refreshError) {

            processQueue(refreshError, null);

            clearToken();

            window.location.href = "/login";

            return Promise.reject(refreshError);

        }

        finally {

            isRefreshing = false;

        }

    }

);

export default api;