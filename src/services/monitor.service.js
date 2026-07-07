import axios from "axios";

import ServiceModel from "../models/service.model.js";

import {
    getActiveServices,
    updateServiceSuccess,
    updateServiceFailure,
    setActiveIncident,
    clearActiveIncident,
} from "../services/service.service.js";
import {

    createHealthCheck,

} from "./healthCheck.service.js";
import {
    createAutomaticIncident,
    resolveAutomaticIncident,
} from "../services/incident.service.js";

export const runHealthChecks = async () => {

    const services = await getActiveServices();

    console.log(
        `Found ${services.length} active service(s).\n`
    );

    for (const service of services) {

        console.log("--------------------------------");
        console.log("Checking:", service.name);
        console.log("URL:", service.url);
        console.log("--------------------------------");

   try {

    const start = Date.now();

    const response = await axios({

        method: service.method,

        url: service.url,

        timeout: service.timeout,

        validateStatus: () => true,

    });

    const responseTime = Date.now() - start;

    if (response.status === service.expectedStatus) {

        const updatedService = await updateServiceSuccess(

            service._id,

            responseTime,

            response.status

        );

        await createHealthCheck({

            service: service._id,

            currentStatus: "UP",

            httpStatus: response.status,

            responseTime,

            error: "",

        });

        console.log("Status:", response.status);
        console.log("Response:", responseTime, "ms");
        console.log("Health: UP");

        if (updatedService.activeIncident) {

            console.log("✅ Service Recovered");

            await resolveAutomaticIncident(
                updatedService.activeIncident
            );

            await clearActiveIncident(
                updatedService._id
            );

            console.log("✅ Incident Resolved Automatically");

        }

    } else {

        await handleFailure(

            service,

            response.status,

            `Expected ${service.expectedStatus} but received ${response.status}`

        );

        await createHealthCheck({

            service: service._id,

            currentStatus: "DOWN",

            httpStatus: response.status,

            responseTime,

            error: `Expected ${service.expectedStatus} but received ${response.status}`,

        });

        console.log("Status:", response.status);
        console.log("Expected:", service.expectedStatus);
        console.log("Health: DOWN");

    }

} catch (err) {

    await handleFailure(

        service,

        null,

        err.message

    );

    await createHealthCheck({

        service: service._id,

        currentStatus: "DOWN",

        httpStatus: null,

        responseTime: null,

        error: err.message,

    });

// console.log("FAILED:");
// console.error(err);
// console.log("Message:", err.message);
// console.log("Code:", err.code);
// console.log("Name:", err.name);
// console.log("Response:", err.response?.data);
// console.log("Status:", err.response?.status);
}

console.log("");
        // await createHealthCheck({

        //     service: service._id,

        //     currentStatus: "DOWN",

        //     httpStatus: null,

        //     responseTime: null,

        //     error: err.message,

        // });
        // console.log("");

    }

};

/*
==========================================
Handle Monitoring Failure
==========================================
*/

/*
==========================================
Handle Monitoring Failure
==========================================
*/

async function handleFailure(
    service,
    statusCode,
    errorMessage
) {

    /*
    ==========================================
    Fetch Latest Service
    ==========================================
    */

    const latestService = await ServiceModel.findById(
        service._id
    );

    /*
    ==========================================
    Incident Already Active
    ==========================================
    */

    if (latestService.activeIncident) {

        await ServiceModel.findByIdAndUpdate(

            latestService._id,

            {

                currentStatus: "DOWN",

                lastCheckedAt: new Date(),

                lastFailureAt: new Date(),

                lastHttpStatus: statusCode,

                lastError: errorMessage,

            },

            {

                returnDocument: "after",

            }

        );

        console.log("🚨 Incident Already Active");

        console.log(
            `Failures: ${latestService.failureThreshold}/${latestService.failureThreshold}`
        );

        return;

    }

    /*
    ==========================================
    Increase Failure Count
    ==========================================
    */

    const updatedService =
        await updateServiceFailure(

            latestService._id,

            errorMessage,

            statusCode

        );

    console.log(
        `Failures: ${updatedService.consecutiveFailures}/${updatedService.failureThreshold}`
    );

    /*
    ==========================================
    Create Incident
    ==========================================
    */

    if (

        updatedService.consecutiveFailures >=
        updatedService.failureThreshold

    ) {
 
        const incident =
            await createAutomaticIncident(
                updatedService
            );

        await setActiveIncident(

            updatedService._id,

            incident._id

        );

        console.log(
            "🚨 Automatic Incident Created"
        );

    }

}