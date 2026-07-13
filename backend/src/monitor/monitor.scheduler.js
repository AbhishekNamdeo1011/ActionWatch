import cron from "node-cron";
import { runHealthChecks } from "./../services/monitor.service.js";

export const startMonitoring = () => {



    /*
        Every 30 seconds
    */

    cron.schedule("*/30 * * * * *", async () => {

    

        await runHealthChecks().catch((err) => {

            console.error("Scheduler Error:", err.message);

        });

    });

};