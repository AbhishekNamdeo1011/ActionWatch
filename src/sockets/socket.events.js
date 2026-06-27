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