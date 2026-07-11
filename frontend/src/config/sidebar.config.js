import {
  LayoutDashboard,
  ShieldAlert,
  Server,
  BarChart3,
  Brain,
  Bell,
  Users,
  Settings,
  User,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["owner", "admin", "responder", "viewer"],
  },
  {
    title: "Incidents",
    path: "/incidents",
    icon: ShieldAlert,
    roles: ["owner", "admin", "responder", "viewer"],
  },
  {
    title: "Services",
    path: "/services",
    icon: Server,
    roles: ["owner", "admin", "responder", "viewer"],
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    roles: ["owner", "admin", "responder"],
  },
  {
    title: "Investigation",
    path: "/investigation",
    icon: Brain,
    roles: ["owner", "admin", "responder"],
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
    roles: ["owner", "admin", "responder", "viewer"],
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
    roles: ["owner", "admin"],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["owner", "admin"],
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
    roles: ["owner", "admin", "responder", "viewer"],
  },
];