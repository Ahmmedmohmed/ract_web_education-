// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminProfilePage from "../../pages/admin/accounts/profile/AdminProfilePage";

export const admin_profile_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/profile`, element: <AdminProfilePage /> },
    { path: `/${App_Admin}/profile/:id`, element: <AdminProfilePage /> },

    { path: `/${App_Admin}/profile/`, element: <AdminProfilePage /> },
    { path: `/${App_Admin}-profile`, element: <AdminProfilePage /> },
    { path: `/${App_Admin}-profile/`, element: <AdminProfilePage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
