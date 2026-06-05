/**
 * ROLE-BASED AUTH IMPLEMENTATION GUIDE
 * 
 * Your system now has three roles:
 * - admin: Full access to all operations
 * - responder: Can respond to incidents, create postmortems
 * - viewer: Read-only access
 */

// Example: Protecting a route with role-based authorization
// ============================================================

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/roleAuth.middleware.js";

const router = Router();

// Admin-only route
router.delete('/incidents/:id', authMiddleware, authorize('admin'), (req, res) => {
    // Only users with 'admin' role can access this
    res.json({ message: "Incident deleted" });
});

// Multi-role access (admin OR responder can access)
router.post('/incidents/:id/respond', authMiddleware, authorize('admin', 'responder'), (req, res) => {
    // Both admin and responder can access this
    res.json({ message: "Response recorded" });
});

// Any authenticated user (all roles)
router.get('/incidents', authMiddleware, (req, res) => {
    // Any logged-in user with any role can access
    const userRole = req.user.role;  // Access the user's role
    res.json({ message: "Incidents list", userRole });
});

// IMPORTANT NOTES:
// ===============
// 1. ALWAYS use authMiddleware BEFORE authorize() middleware
// 2. Middleware chain order: authMiddleware → authorize(...) → controller
// 3. After authMiddleware, req.user contains the full user object including role
// 4. New users are registered with role 'viewer' by default
// 5. Only server admins should be able to promote users to 'admin' (implement separate endpoint)

// Example: Admin endpoint to assign roles (protect this!)
router.put('/users/:userId/role', authMiddleware, authorize('admin'), async (req, res) => {
    const { newRole } = req.body;
    // Validate and update user role in database
    // res.json({ message: "User role updated" });
});

export default router;
