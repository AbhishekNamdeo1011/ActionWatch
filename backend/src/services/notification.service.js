import NotificationModel from "../models/notification.model.js";

import { sendAssignmentEmail } from "./email.service.js";

// We'll add Socket.IO later
// import { emitNotification } from "../socket/notification.socket.js";

export const notifyIncidentAssigned = async (

    user,

    incident

) => {

    /*
    ==========================================
    Save Notification
    ==========================================
    */

    const notification =
        await NotificationModel.create({

            user: user._id,

            incident: incident._id,

            type: "INCIDENT_ASSIGNED",

            title: "New Incident Assigned",

            message: `${incident.title} has been assigned to you.`,

        });

    /*
    ==========================================
    Send Email
    ==========================================
    */

    await sendAssignmentEmail(

        user,

        incident

    ).catch((error) => {

        console.error(

            "Email Error:",

            error.message

        );

    });

    /*
    ==========================================
    Socket.IO
    ==========================================
    */

    // emitNotification(user._id, notification);

    return notification;

};
export const notifyIncidentResolved = async (

    user,

    incident

) => {

    return NotificationModel.create({

        user: user._id,

        incident: incident._id,

        type: "INCIDENT_RESOLVED",

        title: "Incident Resolved",

        message: `${incident.title} has been resolved.`,

    });

};

export const notifyAIRootCause = async (

    user,

    incident

) => {

    return NotificationModel.create({

        user: user._id,

        incident: incident._id,

        type: "AI_ROOT_CAUSE",

        title: "AI Root Cause Ready",

        message: `Root cause analysis is ready for ${incident.title}.`,

    });

};

export const notifyAIPostmortem = async (

    user,

    incident

) => {

    return NotificationModel.create({

        user: user._id,

        incident: incident._id,

        type: "AI_POSTMORTEM",

        title: "AI Postmortem Generated",

        message: `Postmortem is ready for ${incident.title}.`,

    });

};