import { io } from "socket.io-client";

const token = "PASTE_YOUR_ACCESS_TOKEN";

const socket = io("http://localhost:3000", {
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTNlZTY0ZjZjYjdmNjA1YjU2YzU1YTIiLCJzZXNzaW9uSWQiOiI2YTQwMjViMmE0ZDRjMmVjOWM0N2ZkYzMiLCJ1c2VybmFtZSI6IkFiaGlzaGVrIiwiZW1haWwiOiJhaGlzaGVrQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgyNTg4ODUxLCJleHAiOjE3ODI1ODk3NTF9.qmfvrMMN30PBS-wOjc3f_Xzxayu-olFdXR8iKHa05-I"
    }
});
socket.on("hello", (data) => {

    console.log(data);

});
socket.on("connect", () => {
    console.log("✅ Connected");
    socket.emit("join-incident", "6a3ebce0845a22c997fe598c");
});
socket.on("timeline:new", (data) => {
    console.log("\n=========================");
    console.log("📢 NEW TIMELINE EVENT");
    console.log("=========================");
    console.log(data);
});
socket.on("incident:updated", (incident) => {

    console.log("\n========================");
    console.log("🚨 INCIDENT UPDATED");
    console.log("========================");
    console.log(incident);

});
socket.on("incident:responder-added", (incident) => {
    console.log("\n========================");
    console.log("👤 Responder Assigned");
    console.log("========================");
    console.log(incident);
});
socket.on(
    "presence:list",
    users => {

        console.log("\nONLINE USERS");

        console.log(users);

    }
);

socket.on(
    "presence:online",
    user => {

        console.log("\nONLINE");

        console.log(user);

    }
);

socket.on(
    "presence:offline",
    user => {

        console.log("\nOFFLINE");

        console.log(user);

    }
);
socket.on("connect_error", (err) => {
    console.log("Message:", err.message);
    console.log("Description:", err.description);
    console.log("Context:", err.context);
});