import { io } from "socket.io-client";

export const socket = io(

    import.meta.env.VITE_SOCKET_URL,

    {

        autoConnect: false,

        withCredentials: true,

        transports: ["websocket"],

        reconnection: true,

        reconnectionAttempts: 5,

        reconnectionDelay: 1000,

    }

);

/*
==========================================
Connect Socket
==========================================
*/

export const connectSocket = (token) => {

    if (!token) return;

    socket.auth = {

        token,

    };

    if (!socket.connected) {

        socket.connect();

    }

};

/*
==========================================
Disconnect Socket
==========================================
*/

export const disconnectSocket = () => {

    if (socket.connected) {

        socket.disconnect();

    }

};

/*
==========================================
Update Socket Token
==========================================
*/

export const updateSocketToken = (token) => {

    if (!token) return;

    socket.auth = {

        token,

    };

    if (socket.connected) {

        socket.disconnect();

    }

    socket.connect();

};

/*
==========================================
Debug Logs
==========================================
*/

socket.on("connect", () => {


});

socket.on("disconnect", (reason) => {


});

socket.on("connect_error", (err) => {

    console.error("Socket Error:", err.message);

});