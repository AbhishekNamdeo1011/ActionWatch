import Incident from "../models/incident.model.js";
import mongoose from "mongoose";


export const joinIncidentRoom = async (socket, incidentId) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(incidentId)) {
            socket.emit("room:error", {
                message: "Invalid Incident ID"
            });
            return;
        }

        const incident = await Incident.findById(incidentId);

        if (!incident) {
            socket.emit("room:error", {
                message: "Incident not found"
            });
            return;
        } 

const roomName = `war-room:${incidentId}`;
        socket.join(roomName);

        console.log(`${socket.user.username} joined ${roomName}`);
        console.log(socket.rooms);

    } catch (err) {
        console.error("Join Room Error:", err);

        socket.emit("room:error", {
            message: "Unable to join room"
        });
    }
};

export const leaveIncidentRoom = async (socket, incidentId) => {

    const roomName = `incident:${incidentId}`;

    socket.leave(roomName);

    console.log(
        `${socket.user.username} left ${roomName}`
    );

};