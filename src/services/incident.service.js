import IncidentModel from '../models/incident.model.js';
import mongoose from "mongoose";
import {
    INCIDENT_STATUS,
    INCIDENT_SEVERITY,
} from "../constants/incident.constants.js";

import {
    emitIncidentUpdated,
} from "../sockets/socket.events.js";
import userModel from "../models/user.model.js";
import {
    emitResponderAssigned
} from "../sockets/socket.events.js";
import { emitResponderRemoved } from "../sockets/socket.events.js";
import { createTimelineEntry } from "./timeline.service.js";


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
    updateData,
    updatedBy
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
    // Existing Incident
    // -------------------------

    const existingIncident =
        await IncidentModel.findById(
            incidentId
        );

    if (!existingIncident) {

        const error = new Error("Incident not found");
        error.statusCode = 404;
        throw error;

    }

    // -------------------------
    // Update Incident
    // -------------------------

    const incident =
        await IncidentModel
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
            )
            .populate(
                "assignedTo",
                "username role expertise"
            );

    // -------------------------
    // Timeline - Status Changed
    // -------------------------

    if (
        updatePayload.status &&
        existingIncident.status !== incident.status
    ) {

        await createTimelineEntry({

            incidentId: incident._id,

            author: updatedBy,

            eventType: "STATUS_CHANGED",

            message: `Status changed from "${existingIncident.status}" to "${incident.status}".`,

            metadata: {

                oldStatus: existingIncident.status,

                newStatus: incident.status,

            }

        });

    }

    // -------------------------
    // Timeline - Severity Changed
    // -------------------------

    if (
        updatePayload.severity &&
        existingIncident.severity !== incident.severity
    ) {

        await createTimelineEntry({

            incidentId: incident._id,

            author: updatedBy,

            eventType: "SEVERITY_CHANGED",

            message: `Severity changed from "${existingIncident.severity}" to "${incident.severity}".`,

            metadata: {

                oldSeverity: existingIncident.severity,

                newSeverity: incident.severity,

            }

        });

    }

    // -------------------------
    // Timeline - Title Changed
    // -------------------------

    if (
        updatePayload.title &&
        existingIncident.title !== incident.title
    ) {

        await createTimelineEntry({

            incidentId: incident._id,

            author: updatedBy,

            eventType: "INCIDENT_UPDATED",

            message: "Incident title updated.",

            metadata: {

                oldTitle: existingIncident.title,

                newTitle: incident.title,

            }

        });

    }

    // -------------------------
    // Timeline - Description Changed
    // -------------------------

    if (
        updatePayload.description &&
        existingIncident.description !== incident.description
    ) {

        await createTimelineEntry({

            incidentId: incident._id,

            author: updatedBy,

            eventType: "INCIDENT_UPDATED",

            message: "Incident description updated.",

            metadata: {

                oldDescription: existingIncident.description,

                newDescription: incident.description,

            }

        });

    }

    // -------------------------
    // Socket Event
    // -------------------------

    emitIncidentUpdated(incident);

    return incident;

};


export const assignResponderService = async (
    incidentId,
    userId
) => {

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(incidentId)) {
        const error = new Error("Invalid Incident ID");
        error.statusCode = 400;
        throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error = new Error("Invalid User ID");
        error.statusCode = 400;
        throw error;
    }

    // Find incident
    const incident = await IncidentModel.findById(incidentId);

    if (!incident) {
        const error = new Error("Incident not found");
        error.statusCode = 404;
        throw error;
    }

    // Find user
    const user = await userModel.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    // Prevent duplicate assignment
    const alreadyAssigned = incident.assignedTo.some(
        id => id.toString() === userId
    );

    if (alreadyAssigned) {
        const error = new Error("User already assigned");
        error.statusCode = 409;
        throw error;
    }

    incident.assignedTo.push(userId);

    await incident.save();

    await incident.populate([
        {
            path: "createdBy",
            select: "username role"
        },
        {
            path: "assignedTo",
            select: "username role expertise"
        }
    ]);

    emitResponderAssigned(incident);
    await createTimelineEntry({

        incidentId: incident._id,

        author: user._id,

        eventType: "RESPONDER_ASSIGNED",

        message: `${user.username} assigned as responder.`,

        metadata: {

            userId: user._id,

            username: user.username,

            role: user.role,

        }

    });

    return incident;
};

export const removeResponderService = async (
    incidentId,
    userId
) => {
    console.log("Incident ID:", incidentId);
    console.log("User ID:", userId);
    if (!mongoose.Types.ObjectId.isValid(incidentId)) {
        const error = new Error("Invalid Incident ID");
        error.statusCode = 400;
        throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error = new Error("Invalid User ID");
        error.statusCode = 400;
        throw error;
    }

    const incident = await IncidentModel.findById(incidentId);

    if (!incident) {
        const error = new Error("Incident not found");
        error.statusCode = 404;
        throw error;
    }

    const exists = incident.assignedTo.some(
        id => id.toString() === userId
    );

    if (!exists) {
        const error = new Error("Responder is not assigned");
        error.statusCode = 400;
        throw error;
    }
    console.log(
        "Before:",
        incident.assignedTo.map(id => id.toString())
    );

    incident.assignedTo = incident.assignedTo.filter(
        id => id.toString() !== userId
    );
    console.log(
        "After:",
        incident.assignedTo.map(id => id.toString())
    );
    await incident.save();
    const updated = await IncidentModel.findById(incidentId);

    console.log(
        "Database:",
        updated.assignedTo.map(id => id.toString())
    );
    await incident.populate([
        {
            path: "createdBy",
            select: "username role"
        },
        {
            path: "assignedTo",
            select: "username role expertise"
        }
    ]);

    emitResponderRemoved(incident);
await createTimelineEntry({

    incidentId: incident._id,

    author: userId,

    eventType: "RESPONDER_REMOVED",

    message: "Responder removed from incident.",

    metadata: {

        userId,

    }

});
    return incident;
};


/*
==========================================
Create Automatic Incident
==========================================
*/

export const createAutomaticIncident = async (
    service
) => {

    const incident = await IncidentModel.create({

        title: `${service.name} is DOWN`,

        description: `${service.name} failed health checks.`,

        severity: "P1",

        status: "open",

        service: "api",

        detectedBy: "monitor",

        affectedUsers: 0,

        errorLogs: "Automatic health check failed.",

        detectedAt: new Date(),

    });

    await createTimelineEntry({

        incidentId: incident._id,

        eventType: "INCIDENT_CREATED",

        message: `${service.name} failed health checks. Incident created automatically.`,

        metadata: {

            serviceId: service._id,

            serviceName: service.name,

            detectedBy: "monitor",

        }

    });

    return incident;

};

/*
==========================================
Resolve Automatic Incident
==========================================
*/

export const resolveAutomaticIncident = async (
    incidentId
) => {

    const incident = await IncidentModel.findById(
        incidentId
    );

    if (!incident) {
        return null;
    }

    const resolvedAt = new Date();

    const mttr = Math.floor(
        (resolvedAt - incident.detectedAt) / 1000
    );

    incident.status = "resolved";
    incident.resolvedAt = resolvedAt;
    incident.mttr = mttr;

    await incident.save();
    await createTimelineEntry({

        incidentId: incident._id,

        eventType: "INCIDENT_RESOLVED",

        message: "Incident resolved automatically after service recovered.",

        metadata: {

            resolvedBy: "monitor",

            mttr: incident.mttr,

        }

    });
    return incident;

};