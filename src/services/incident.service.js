import IncidentModel from '../models/incident.model.js';
import mongoose from "mongoose";
import {
    INCIDENT_STATUS,
    INCIDENT_SEVERITY,
} from "../constants/incident.constants.js";

import {
    emitIncidentUpdated, 
} from "../sockets/socket.events.js";

export const createIncidentService = async (incidentData) => {
  const incident = await IncidentModel.create({
    ...incidentData,
    affectedUsers: incidentData.affectedUsers ?? 0,
  });

  return incident;
};

export const getIncidentsService = async (queryParams) => {

    let {
        page = 1,
        limit = 10,
        status,
        severity,
        service,
        search,
        sort = "-createdAt",
    } = queryParams;

    // --------------------------
    // Pagination Validation
    // --------------------------

    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || page < 1) page = 1;

    if (isNaN(limit) || limit < 1) limit = 10;

    // Maximum records per request
    if (limit > 100) limit = 100;

    // --------------------------
    // Allowed Enums
    // --------------------------

    const allowedStatus = [
        "open",
        "investigating",
        "resolved",
    ];

    const allowedSeverity = [
        "P0",
        "P1",
        "P2",
    ];

    if (status && !allowedStatus.includes(status)) {
        const error = new Error("Invalid status.");
        error.statusCode = 400;
        throw error;
    }

    if (severity && !allowedSeverity.includes(severity)) {
        const error = new Error("Invalid severity.");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------
    // Allowed Sort Fields
    // --------------------------

    const allowedSortFields = [
        "createdAt",
        "-createdAt",
        "severity",
        "-severity",
        "status",
        "-status",
    ];

    if (!allowedSortFields.includes(sort)) {
        sort = "-createdAt";
    }

    // --------------------------
    // Build Mongo Filter
    // --------------------------

    const filter = {};

    if (status) filter.status = status;

    if (severity) filter.severity = severity;

    if (service) filter.service = service;

    if (search) {

        filter.$or = [

            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },

            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },

        ];

    }

    const skip = (page - 1) * limit;

    const total = await IncidentModel.countDocuments(filter);

    const incidents = await IncidentModel

        .find(filter)

        .populate(
            "createdBy",
            "username role"
        )

        .sort(sort)

        .skip(skip)

        .limit(limit);

    return {

        incidents,

        pagination: {

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit),

        },

    };

}; 

export const getIncidentByIdService = async (incidentId) => {

    // ----------------------------
    // Validate ObjectId
    // ----------------------------

    if (!mongoose.Types.ObjectId.isValid(incidentId)) {

        const error = new Error("Invalid Incident ID");
        error.statusCode = 400;

        throw error;
    }

    // ----------------------------
    // Find Incident
    // ----------------------------

    const incident = await IncidentModel

        .findById(incidentId)

        .populate(
            "createdBy",
            "username role"
        )

       

    if (!incident) {

        const error = new Error("Incident not found");
        error.statusCode = 404;

        throw error;

    }

    return incident;

};

export const updateIncidentService = async (
    incidentId,
    updateData
) => {

    // -------------------------
    // Validate ObjectId
    // -------------------------

    if (!mongoose.Types.ObjectId.isValid(incidentId)) {

        const error = new Error("Invalid Incident ID");
        error.statusCode = 400;

        throw error;

    }

    // -------------------------
    // Allowed Fields
    // -------------------------

    const allowedUpdates = [

        "title",

        "description",

        "severity",

        "status",

        "service",

        "affectedUsers",

        "errorCode",

        "errorLogs",

    ];

    const updatePayload = {};

    for (const key of allowedUpdates) {

        if (updateData[key] !== undefined) {

            updatePayload[key] = updateData[key];

        }

    }

    // -------------------------
    // Validate Status
    // -------------------------

    if (
        updatePayload.status &&
        !INCIDENT_STATUS.includes(updatePayload.status)
    ) {

        const error = new Error("Invalid status.");
        error.statusCode = 400;

        throw error;

    }

    // -------------------------
    // Validate Severity
    // -------------------------

    if (
        updatePayload.severity &&
        !INCIDENT_SEVERITY.includes(updatePayload.severity)
    ) {

        const error = new Error("Invalid severity.");
        error.statusCode = 400;

        throw error;

    }

    // -------------------------
    // Update
    // -------------------------

    const incident = await IncidentModel

        .findByIdAndUpdate(

            incidentId,

            updatePayload,

            {

                new: true,

                runValidators: true,

            }

        )

        .populate(
            "createdBy",
            "username role"
        );

    if (!incident) {

        const error = new Error("Incident not found");
        error.statusCode = 404;

        throw error;

    }

    // -------------------------
    // Socket Event
    // -------------------------

    emitIncidentUpdated(incident);

    return incident;

};