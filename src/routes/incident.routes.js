import {Router} from "express";
import { createIncident,getIncidents,getIncidentById,updateIncident } from "../controllers/incident.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/roleAuth.middleware.js";
const router = Router();

router.post('/', authMiddleware, authorize('admin', 'responder'), createIncident);
router.get('/', authMiddleware, authorize('admin', 'responder', 'viewer'), getIncidents);
router.get('/:incidentId', authMiddleware, authorize('admin', 'responder', 'viewer'), getIncidentById);
router.patch("/:incidentId",authMiddleware, authorize("admin", "responder"), updateIncident
);
export default router;