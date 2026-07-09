import cron from "node-cron";
import { runHealthChecks } from "./../services/monitor.service.js";

export const startMonitoring = () => {

    console.log("=================================");
    console.log(" Monitoring Scheduler Started");
    console.log("=================================");

    /*
        Every 30 seconds
    */

    cron.schedule("*/30 * * * * *", async () => {

        console.log("\nRunning Health Checks...");

        await runHealthChecks().catch((err) => {

            console.error("Scheduler Error:", err.message);

        });

    });

};