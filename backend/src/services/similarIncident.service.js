import IncidentModel from "../models/incident.model.js";

import {
    getSimilarIncidents as getSimilarIncidentsFromRag,

} from "./rag.service.js";

export const getSimilarIncidents = async (

    incidentId

) => {

    /*
    ==========================================
    Find Current Incident
    ==========================================
    */

   const incident = await IncidentModel.findById(incidentId)

.select(
`
title
description
severity
status
service
affectedUsers
errorLogs
aiSummary
aiRootCauses
tags
`
)

.populate("service", "name")

.lean();

    if (!incident) {

        const error = new Error(

            "Incident not found."

        );

        error.statusCode = 404;

        throw error;

    }

    /*
    ==========================================
    Pinecone Search
    ==========================================
    */

    const similar = await getSimilarIncidentsFromRag(

        incident

    );

    return similar;

};