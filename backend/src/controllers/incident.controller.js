import { createIncidentService } from '../services/incident.service.js';
import { getIncidentsService } from "../services/incident.service.js";
import { getIncidentByIdService} from "../services/incident.service.js";
import { updateIncidentService,} from "../services/incident.service.js";
import {assignResponderService} from "../services/incident.service.js";
import {
    removeResponderService
} from "../services/incident.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createIncident = asyncHandler(async (req, res) => {

  const {
    title,
    description,
    severity,
    service,
    affectedUsers,
    errorCode,
    errorLogs,
  } = req.body;

  const normalizedTitle = typeof title === 'string' ? title.trim() : String(title ?? '').trim();
  const normalizedDescription = typeof description === 'string' ? description.trim() : String(description ?? '').trim();
  const normalizedSeverity = typeof severity === 'string' ? severity.trim() : String(severity ?? '').trim();
  const normalizedService = typeof service === 'string' ? service.trim() : String(service ?? '').trim();

  if (!normalizedTitle || !normalizedDescription || !normalizedSeverity || !normalizedService) {
    return res.status(400).json({
      success: false,
      message: 'Title, description, severity and service are required.',
    });
  }

  const incidentData = {
    title: normalizedTitle,
    description: normalizedDescription,
    severity: normalizedSeverity,
    service: normalizedService,
    affectedUsers,
    errorCode,
    errorLogs,
    createdBy: req.user._id,
    detectedBy: 'manual',
    status: 'open',
    detectedAt: new Date(),
  };

  const incident = await createIncidentService(incidentData);

  return res.status(201).json({
    success: true,
    message: 'Incident created successfully.',
    data: incident,
  });
});

export const getIncidents = asyncHandler(async (req, res) => {

    const result = await getIncidentsService(req.query);

    return res.status(200).json({

        success: true,

        message: "Incidents fetched successfully.",

        data: result.incidents,

        pagination: result.pagination,

    });

});

export const getIncidentById = asyncHandler(async (req, res) => {

    const incident = await getIncidentByIdService(
        req.params.incidentId
    );

    return res.status(200).json({

        success: true,

        message: "Incident fetched successfully.",

        data: incident

    });

});

export const updateIncident = asyncHandler(async (req, res) => {

    const incident =
        await updateIncidentService(

            req.params.incidentId,

            req.body,

            req.user._id
        );

    return res.status(200).json({

        success: true,

        message: "Incident updated successfully.",

        data: incident,

    });

});

export const assignResponder = asyncHandler(async (req, res) => {

    const incident =
        await assignResponderService(

            req.params.incidentId,

            req.body.userId

        );

    return res.status(200).json({

        success: true,

        message: "Responder assigned successfully.",

        data: incident

    });

});

export const removeResponder = asyncHandler(async (req, res) => {

    const incident = await removeResponderService(
        req.params.incidentId,
        req.params.userId
    );

    return res.status(200).json({
        success: true,
        message: "Responder removed successfully.",
        data: incident
    });
});