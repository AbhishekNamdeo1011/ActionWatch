import {
    joinIncidentRoom,
    leaveIncidentRoom
} from "./room.service.js";

import {
    addOnlineUser,
    removeOnlineUser,
    getOnlineUsers
} from "../sockets/presence.service.js";

import {
    emitPresenceOnline,
    emitPresenceOffline,
    emitPresenceList
} from "./socket.events.js";

export default function registerSocketHandlers(io) {

    io.on("connection", (socket) => {

        // ===========================
        // Track Online User
        // ===========================
        addOnlineUser(
            socket.user,
            socket.id
        );

        // Send current online users only to this socket
        emitPresenceList(
            io,
            socket.id,
            getOnlineUsers()
        );

        console.log(`${socket.user.username} Connected`);

        // ===========================
        // Join War Room
        // ===========================
        socket.on("join-incident", (incidentId) => {

    if (!incidentId) return;

    joinIncidentRoom(socket, incidentId);

    // Initialize the set if it doesn't exist
    if (!socket.joinedRooms) {
        socket.joinedRooms = new Set();
    }

    const roomName = `war-room:${incidentId}`;

    socket.joinedRooms.add(roomName);

    emitPresenceOnline(
        io,
        roomName,
        socket.user
    );

});

        // ===========================
        // Leave War Room
        // ===========================
       socket.on("leave-incident", (incidentId) => {

    if (!incidentId) return;

    leaveIncidentRoom(socket, incidentId);

    const roomName = `war-room:${incidentId}`;

    if (socket.joinedRooms) {
        socket.joinedRooms.delete(roomName);
    }

});

        // ===========================
        // Disconnect
        // ===========================
        socket.on("disconnect", () => {

            const offline = removeOnlineUser(
                socket.user._id.toString(),
                socket.id
            );

           if (offline && socket.joinedRooms) {

    for (const roomName of socket.joinedRooms) {

        emitPresenceOffline(
            io,
            roomName,
            socket.user
        );

    }

}

            console.log(`${socket.user.username} Disconnected`);

        });

    });

}