import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/authorize.middleware.js';
import { createTimeline, getIncidentTimeline } from '../controllers/timeline.controller.js';
import { USER_ROLES } from '../constants/role.constants.js';

const router = Router();

router.post('/:incidentId/timeline', authMiddleware, authorize(USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), createTimeline);
router.get('/:incidentId/timeline', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), getIncidentTimeline);

export default router;