// utils
import { App_Admin } from "../../utils/constants";

// component
import DashboardAdminPage from "../../pages/admin/dashboard/DashboardAdminPage";

export const admin_dashboard_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/dashboard`, element: <DashboardAdminPage /> },

    { path: `/${App_Admin}/dashboard/`, element: <DashboardAdminPage /> },
    { path: `/${App_Admin}/dashboard-`, element: <DashboardAdminPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
