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

                // Update service as healthy
                const updatedService = await updateServiceSuccess(
                    service._id,

                    responseTime,

                    response.status
                );

                console.log("Status:", response.status);
                console.log("Response:", responseTime, "ms");
                console.log("Health: UP");

                /*
                ==========================================
                Automatic Recovery
                ==========================================
                */

                if (updatedService.activeIncident) {

                    console.log("✅ Service Recovered");

                    await resolveAutomaticIncident(
                        updatedService.activeIncident
                    );

                    await clearActiveIncident(
                        updatedService._id
                    );

                    console.log(
                        "✅ Incident Resolved Automatically"
                    );

                }

            } else {

                await handleFailure( service,

    response.status,

    `Expected ${service.expectedStatus} but received ${response.status}`);

                console.log("Status:", response.status);
                console.log("Expected:", service.expectedStatus);
                console.log("Health: DOWN");

            }

        } catch (err) {

            await handleFailure(service,

    null,

    err.message);

            console.log("FAILED:", err.message);

        }

        console.log("");

    }

};

/*
==========================================
Handle Monitoring Failure
==========================================
*/

async function handleFailure(service,

    statusCode,

    errorMessage) {

    await updateServiceFailure( service._id,

    errorMessage,

    statusCode);

    const updatedService = await ServiceModel.findById(
        service._id
    );

    console.log(
        "Failures:",
        updatedService.consecutiveFailures,
        "/",
        updatedService.failureThreshold
    );

    if (
        updatedService.consecutiveFailures >=
        updatedService.failureThreshold &&
        !updatedService.activeIncident
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