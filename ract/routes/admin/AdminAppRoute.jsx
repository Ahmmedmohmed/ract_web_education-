// utils
import { App_Admin } from "../../utils/constants";

// component
import AppAdmin from "../../pages/admin/AppAdmin";

export const admin_app_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/home`, element: <AppAdmin /> },

    { path: `/admin`, element: <AppAdmin /> },
    { path: `/${App_Admin}`, element: <AppAdmin /> },

    { path: `${App_Admin}`, element: <AppAdmin /> },
    { path: `/${App_Admin}`, element: <AppAdmin /> },
    { path: `${App_Admin}/`, element: <AppAdmin /> },
    { path: `/${App_Admin}/`, element: <AppAdmin /> },
    { path: `${App_Admin}-`, element: <AppAdmin /> },
    { path: `/${App_Admin}-`, element: <AppAdmin /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
