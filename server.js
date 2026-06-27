import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initializeSocket } from "./src/config/socket.js";

connectDB();

const server = http.createServer(app);

initializeSocket(server);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});