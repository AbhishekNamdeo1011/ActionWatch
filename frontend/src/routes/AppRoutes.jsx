import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";
import LazyRoute from "./LazyRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayouts";
import DashboardLayout from "../layouts/DashboardLayout";

/*
==========================================
Lazy Loaded Pages
==========================================
*/

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const IncidentList = lazy(() =>
    import("../pages/incidents/IncidentList")
);

const IncidentDetails = lazy(() =>
    import("../pages/incidents/IncidentDetails")
);

const Services = lazy(() =>
    import("../pages/services/Services")
);

const ServiceDetails = lazy(() =>
    import("../pages/services/ServiceDetails")
);

const Analytics = lazy(() =>
    import("../pages/analytics/Analytics")
);

const Investigation = lazy(() =>
    import("../pages/investigation/Investigation")
);

const Notifications = lazy(() =>
    import("../pages/notifications/Notifications")
);

const Profile = lazy(() =>
    import("../pages/profile/Profile")
);

const UserManagement = lazy(() =>
    import("../pages/users/UserManagement")
);

const Settings = lazy(() =>
    import("../pages/settings/Settings")
);

const NotFound = lazy(() =>
    import("../pages/errors/NotFound")
);

const Forbidden = lazy(() =>
    import("../pages/errors/Forbidden")
);

const AppRoutes = () => {
    return (
        <Routes>

            {/* Redirect */}

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
                        element={
                            <LazyRoute>
                                <Login />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <LazyRoute>
                                <Register />
                            </LazyRoute>
                        }
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
                        element={
                            <LazyRoute>
                                <Dashboard />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/incidents"
                        element={
                            <LazyRoute>
                                <IncidentList />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/incidents/:incidentId"
                        element={
                            <LazyRoute>
                                <IncidentDetails />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/services"
                        element={
                            <LazyRoute>
                                <Services />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/services/:serviceId"
                        element={
                            <LazyRoute>
                                <ServiceDetails />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/analytics"
                        element={
                            <LazyRoute>
                                <Analytics />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/investigation"
                        element={
                            <LazyRoute>
                                <Investigation />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/notifications"
                        element={
                            <LazyRoute>
                                <Notifications />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <LazyRoute>
                                <Profile />
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <LazyRoute>
                                <RoleRoute roles={["admin", "owner"]}>
                                    <UserManagement />
                                </RoleRoute>
                            </LazyRoute>
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <LazyRoute>
                                <RoleRoute roles={["admin", "owner"]}>
                                    <Settings />
                                </RoleRoute>
                            </LazyRoute>
                        }
                    />

                </Route>

            </Route>

            {/* ==========================
                Error Pages
            ========================== */}

            <Route
                path="/403"
                element={
                    <LazyRoute>
                        <Forbidden />
                    </LazyRoute>
                }
            />

            <Route
                path="*"
                element={
                    <LazyRoute>
                        <NotFound />
                    </LazyRoute>
                }
            />

        </Routes>
    );
};

export default AppRoutes;