// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminAccountPage from "../../pages/admin/accounts/account/AdminAccountPage";

export const admin_account_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/account`, element: <AdminAccountPage /> },
    { path: `/${App_Admin}/account/:id`, element: <AdminAccountPage /> },

    { path: `/${App_Admin}/account/`, element: <AdminAccountPage /> },
    { path: `/${App_Admin}-account`, element: <AdminAccountPage /> },
    { path: `/${App_Admin}-account/`, element: <AdminAccountPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
