import incidentModel from '../models/incident.model.js';
import timelineModel from '../models/timeline.model.js';
import { emitTimelineCreated } from '../sockets/socket.events.js';
export const createTimelineEntry = async ({
    incidentId,
    author,
    message,
    type
}) => {

    const incident = await incidentModel.findById(incidentId);

    if (!incident) {

        const error = new Error("Incident not found");
        error.statusCode = 404;

        throw error;
    }

    const timeline = await timelineModel.create({

        incident: incidentId,

        author,

        message,

        type

    });

    await timeline.populate(
        "author",
        "username role"
    );

    emitTimelineCreated(
        incidentId,
        timeline
    );

    return timeline;
};

export const getTimelineByIncident = async (incidentId) => {
  const incident = await incidentModel.findById(incidentId).select('_id');

  if (!incident) {
    const error = new Error('Incident not found.');
    error.statusCode = 404;
    throw error;
  }

  const timelineEntries = await timelineModel
    .find({ incident: incidentId })
    .sort({ createdAt: 1 })
    .populate({
      path: 'author',
      select: 'name email -password',
    });

  return timelineEntries;
};

// export const createTimelineService = async(data)=>{

//     const timeline = await timelineModel.create(data);

//     await timeline.populate(
//         "author",
//         "username role"
//     );

//     emitTimelineCreated(
//         timeline.incident.toString(),
//         timeline
//     );

//     return timeline;

// };