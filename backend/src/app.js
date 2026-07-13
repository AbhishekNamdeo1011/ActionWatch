import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import postmortemRoutes from "./routes/postmortem.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import similarIncidentRoutes from "./routes/similarIncident.routes.js";
import testMail from "./routes/testNotification.route.js";
import userRoutes from "./routes/user.routes.js";
import {
    errorHandler,
    notFound,
} from "./middleware/error.middleware.js";

 
const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
       
    
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/postmortems", postmortemRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/similar-incidents", similarIncidentRoutes);
app.use("/api/auth", testMail);
app.use(

    "/api/users",

    userRoutes

);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ActionWatch Backend is running 🚀",
    });
}); 
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
    });
});
app.use(notFound); 
app.use(errorHandler);

export default app;

