import { Server } from "socket.io";
import registerSocketHandlers from "../sockets/socket.handler.js";
import { socketAuth } from "../sockets/socket.auth.js";
let io;

export const initializeSocket = (server) => {

    io = new Server(server,{
        cors:{
            origin:process.env.CLIENT_URL,
            credentials:true
        }
    });

    io.use(socketAuth);

    registerSocketHandlers(io);

    return io;
};

export { io };