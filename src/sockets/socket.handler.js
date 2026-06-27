import {
    joinIncidentRoom,
    leaveIncidentRoom
} from "./room.service.js";

export default function registerSocketHandlers(io) {

    io.on("connection", (socket) => {
console.log(`${socket.user.username} Connected`);

        socket.on("join-incident", (incidentId) => {
            if (!incidentId) {

                return;

            }

            joinIncidentRoom(socket, incidentId);

        });

        socket.on("leave-incident", (incidentId) => {

            leaveIncidentRoom(socket, incidentId);

        });
        socket.on("disconnect", () => {

            console.log(
                `${socket.user.username} Disconnected`
            );

        });

    });

}