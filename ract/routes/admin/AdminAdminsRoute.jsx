// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminsAccountsPage from "../../pages/admin/accounts/admins/AdminsAccountsPage";
import AdminsCreate from "../../pages/admin/accounts/admins/create/AdminsCreate";
import AdminDetails from "../../pages/admin/accounts/admins/details/AdminDetails";
import AdminUpdate from "../../pages/admin/accounts/admins/update/AdminUpdate";

export const admin_admins_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/admins`, element: <AdminsAccountsPage /> },

    { path: `/${App_Admin}/admins/`, element: <AdminsAccountsPage /> },
    { path: `/${App_Admin}/admins-`, element: <AdminsAccountsPage /> },

    // ====================================================================
    // Create
    { path: `/${App_Admin}/admins/create`, element: <AdminsCreate /> },

    { path: `/${App_Admin}/admins/create/`, element: <AdminsCreate /> },
    { path: `/${App_Admin}/admins/create-`, element: <AdminsCreate /> },

    // =======================================================================
    // Details
    { path: `/${App_Admin}/admins/:adminsId`, element: <AdminDetails /> },

    { path: `/${App_Admin}/admins/:adminsId`, element: <AdminDetails /> },
    { path: `/${App_Admin}/admins/:adminsId`, element: <AdminDetails /> },

    // ====================================================================
    // Update
    { path: `/${App_Admin}/admins/update/:adminId`, element: <AdminUpdate /> },

    {
        path: `/${App_Admin}/admins/update/:adminId/`,
        element: <AdminUpdate />,
    },
    {
        path: `/${App_Admin}/admins/update/:adminId-`,
        element: <AdminUpdate />,
    },

    // ====================================================================
];
