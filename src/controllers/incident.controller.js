import { createIncidentService } from '../services/incident.service.js';
import { getIncidentsService } from "../services/incident.service.js";
import { getIncidentByIdService} from "../services/incident.service.js";
import { updateIncidentService,} from "../services/incident.service.js";

export const createIncident = async (req, res) => {
  try {
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
  } catch (error) {
    if (error?.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Create Incident Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getIncidents = async (req, res) => {

    try {

        const result = await getIncidentsService(req.query);

        return res.status(200).json({

            success: true,

            message: "Incidents fetched successfully.",

            data: result.incidents,

            pagination: result.pagination,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

export const getIncidentById = async (req, res) => {

    try {

        const incident = await getIncidentByIdService(
            req.params.incidentId
        );

        return res.status(200).json({

            success: true,

            message: "Incident fetched successfully.",

            data: incident

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

export const updateIncident = async (
    req,
    res
) => {

    try {

        const incident =
            await updateIncidentService(

                req.params.incidentId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Incident updated successfully.",

            data: incident,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};