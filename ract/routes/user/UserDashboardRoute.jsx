// utils
import { App_User } from "../../utils/constants";

// component
import UserDashboardPage from "../../pages/user/dashboard/UserDashboardPage";

export const user_dashboard_route = [
    // ====================================================================
    // Details
    { path: `/${App_User}/dashboard`, element: <UserDashboardPage /> },

    { path: `/${App_User}/dashboard/`, element: <UserDashboardPage /> },
    { path: `/${App_User}/dashboard-`, element: <UserDashboardPage /> },

    // ====================================================================
];
