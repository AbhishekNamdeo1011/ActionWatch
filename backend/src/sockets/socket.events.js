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
export const emitPresenceOnline = (io, roomName, user) => {

    io.to(roomName).emit("presence:online", {
        userId: user._id,
        username: user.username,
        role: user.role
    });

};

export const emitPresenceOffline = (io, roomName, user) => {

    io.to(roomName).emit("presence:offline", {
        userId: user._id,
        username: user.username
    });

};

export const emitPresenceList = (
    io,
    socketId,
    users
) => {

    io.to(socketId).emit(
        "presence:list",
        users
    );

};