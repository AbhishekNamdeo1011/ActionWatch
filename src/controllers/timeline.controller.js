import { createTimelineEntry, getTimelineByIncident } from '../services/timeline.service.js';

export const createTimeline = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { message, type } = req.body;

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.',
      });
    }

    const normalizedMessage = message.trim();

    if (normalizedMessage.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Message must not exceed 500 characters.',
      });
    }

    const timelineEntry = await createTimelineEntry({
      incidentId,
      author: req.user._id,
      message: normalizedMessage,
      type,
    });
    return res.status(201).json({
      success: true,
      message: 'Timeline entry created successfully.',
      data: timelineEntry,
    });
  } catch (error) {
    if (error?.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error?.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Create Timeline Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getIncidentTimeline = async (req, res) => {
  try {
    const { incidentId } = req.params;

    const timelineEntries = await getTimelineByIncident(incidentId);

    return res.status(200).json({
      success: true,
      message: 'Timeline fetched successfully.',
      data: timelineEntries,
    });
  } catch (error) {
    if (error?.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Get Timeline Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};