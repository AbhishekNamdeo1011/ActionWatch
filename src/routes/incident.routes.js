import {Router} from "express";
import { createIncident,getIncidents,getIncidentById,updateIncident,assignResponder,removeResponder } from "../controllers/incident.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";
const router = Router();

router.post('/', authMiddleware, authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER), createIncident);
router.get('/', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), getIncidents);
router.get('/:incidentId', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), getIncidentById);
router.patch("/:incidentId", authMiddleware, authorize(USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), updateIncident);
router.post("/:incidentId/responders", authMiddleware, authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER), assignResponder);
router.delete( "/:incidentId/responders/:userId", authMiddleware, authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER), removeResponder);
export default router;