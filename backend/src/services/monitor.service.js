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

   

    for (const service of services) {

     

        await processServiceCheck(service).catch(async (err) => {

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

            console.error("FAILED:", err.message);

        });

       

    }

};

async function processServiceCheck(service) {

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

      

        if (updatedService.activeIncident) {

           

            await resolveAutomaticIncident(
                updatedService.activeIncident
            );

            await clearActiveIncident(
                updatedService._id
            );

            

        }

        return;

    }

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

 

}

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

       

    }

}