import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initializeSocket } from "./src/config/socket.js";
import { startMonitoring } from "./src/monitor/monitor.scheduler.js";

async function startServer() {

    try {

        // 1. Connect MongoDB
        await connectDB();

        // 2. Create HTTP Server
        const server = http.createServer(app);

        // 3. Initialize Socket.IO
        initializeSocket(server);

        // 4. Start Express Server
        server.listen(3000, () => {

            console.log("Server is running on port 3000");

            // 5. Start Monitoring Scheduler
            // startMonitoring();

        });

    } catch (error) {

        console.error("Failed to start server");
        console.error(error);

        process.exit(1);

    }

}

startServer();