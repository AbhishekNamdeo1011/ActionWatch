import { Navigate, Route, Routes } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayouts";
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Incidents
import IncidentList from "../pages/incidents/IncidentList";
import WarRoom from "../pages/incidents/WarRoom";
import IncidentDetails from "@/pages/incidents/IncidentDetails";

// Monitoring
import Monitoring from "../pages/monitoring/Monitoring";
import ServiceDetails from "../pages/monitoring/ServiceDetails";

// Analytics
import Analytics from "../pages/analytics/Analytics";

// Investigation
import Investigation from "../pages/investigation/Investigation";

// Notifications
import Notifications from "../pages/notifications/Notifications";

// Users
import UserManagement from "../pages/users/UserManagement";

// Settings
import Settings from "../pages/settings/Settings";

// Profile
import Profile from "../pages/profile/Profile";

// Error Pages
import NotFound from "../pages/errors/NotFound";
import Forbidden from "../pages/errors/Forbidden";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Redirect Root */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* ==========================
                Public Routes
            ========================== */}

          <Route element={<PublicRoute />}>

    <Route element={<AuthLayout />}>

        <Route
            path="/login"
            element={<Login />}
        />

        <Route
            path="/register"
            element={<Register />}
        />

    </Route>

</Route>

            {/* ==========================
                Protected Routes
            ========================== */}

            <Route element={<ProtectedRoute />}>

    <Route element={<DashboardLayout />}>

        <Route

            path="/dashboard"

            element={<Dashboard />}

        />

        <Route

            path="/incidents"

            element={<IncidentList />}

        />
<Route
    path="/incidents/:incidentId"
    element={<IncidentDetails />}
/>
        {/* <Route

            path="/incidents/:incidentId"

            element={<WarRoom />}

        /> */}

        <Route

            path="/monitoring"

            element={<Monitoring />}

        />

        <Route

            path="/monitoring/:serviceId"

            element={<ServiceDetails />}

        />

        <Route

            path="/analytics"

            element={<Analytics />}

        />

        <Route

            path="/investigation"

            element={<Investigation />}

        />

        <Route

            path="/notifications"

            element={<Notifications />}

        />

        <Route

            path="/profile"

            element={<Profile />}

        />

        <Route

            path="/users"

            element={

                <RoleRoute roles={["admin","owner"]}>

                    <UserManagement/>

                </RoleRoute>

            }

        />

        <Route

            path="/settings"

            element={

                <RoleRoute roles={["admin","owner"]}>

                    <Settings/>

                </RoleRoute>

            }

        />

    </Route>

</Route>

            {/* Error Routes */}

            <Route
                path="/403"
                element={<Forbidden />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
};

export default AppRoutes;