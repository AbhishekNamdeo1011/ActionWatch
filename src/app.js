import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import postmortemRoutes from "./routes/postmortem.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import similarIncidentRoutes from "./routes/similarIncident.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/services", serviceRoutes); 
app.use("/api/ai", aiRoutes);
app.use("/api/postmortems", postmortemRoutes);
app.use(

    "/api/dashboard",

    dashboardRoutes

);
app.use(

    "/api/similar-incidents",

    similarIncidentRoutes

);
export default app; 

