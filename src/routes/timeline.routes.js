import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/roleAuth.middleware.js';
import { createTimeline, getIncidentTimeline } from '../controllers/timeline.controller.js';

const router = Router();

router.post('/:incidentId/timeline', authMiddleware, authorize('admin', 'responder'), createTimeline);
router.get('/:incidentId/timeline', authMiddleware, getIncidentTimeline);

export default router;