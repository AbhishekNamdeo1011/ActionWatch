import { io } from "../config/socket.js";

export const emitTimelineCreated = (incidentId, timeline) => {

    

    io.to(`war-room:${incidentId}`).emit("timeline:new", timeline);

    
};

export const emitIncidentUpdated = (incident) => {

    io.to(

        `war-room:${incident._id}`

    ).emit(

        "incident:updated",

        incident

    );

};

export const emitResponderAssigned = (incident) => {

    io.to(`war-room:${incident._id}`)
        .emit("incident:responder-added", incident);

};

export const emitResponderRemoved = (incident) => {

    io.to(`war-room:${incident._id}`)
        .emit("incident:responder-removed", incident);

};
