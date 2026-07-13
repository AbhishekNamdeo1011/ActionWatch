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
   const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

            // 5. Start Monitoring Scheduler
            startMonitoring();

    

    } catch (error) {

        console.error("Failed to start server");
        console.error(error);

        process.exit(1);

    }

}

startServer();