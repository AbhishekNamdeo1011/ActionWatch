import {Router} from "express";
import { createIncident,getIncidents,getIncidentById,updateIncident,assignResponder,removeResponder } from "../controllers/incident.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/roleAuth.middleware.js";
const router = Router();

router.post('/', authMiddleware, authorize('admin', 'responder'), createIncident);
router.get('/', authMiddleware, authorize('admin', 'responder', 'viewer'), getIncidents);
router.get('/:incidentId', authMiddleware, authorize('admin', 'responder', 'viewer'), getIncidentById);
router.patch("/:incidentId",authMiddleware, authorize("admin", "responder"), updateIncident);
router.post("/:incidentId/responders",authMiddleware,authorize("admin"),assignResponder);
router.delete( "/:incidentId/responders/:userId", authMiddleware, authorize("admin"),removeResponder);
export default router;