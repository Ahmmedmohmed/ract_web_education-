// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminHelpPage from "../../pages/admin/help/AdminHelpPage";

export const admin_help_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/help`, element: <AdminHelpPage /> },

    { path: `/${App_Admin}/help/`, element: <AdminHelpPage /> },
    { path: `/${App_Admin}/help-`, element: <AdminHelpPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
