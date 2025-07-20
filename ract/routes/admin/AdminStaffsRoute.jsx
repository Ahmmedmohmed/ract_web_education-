// utils
import { App_Admin } from "../../utils/constants";

// component
import AccountsStaffsPage from "../../pages/admin/accounts/staffs/AccountsStaffsPage";
import StaffsCreate from "../../pages/admin/accounts/staffs/create/StaffsCreate";
import StaffDetails from "../../pages/admin/accounts/staffs/details/StaffDetails";
import StaffUpdate from "../../pages/admin/accounts/staffs/update/StaffUpdate";

export const admin_staffs_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/staffs`, element: <AccountsStaffsPage /> },

    { path: `/${App_Admin}/staffs/`, element: <AccountsStaffsPage /> },
    { path: `/${App_Admin}/staffs-`, element: <AccountsStaffsPage /> },

    // ====================================================================
    // Create
    { path: `/${App_Admin}/staffs/create`, element: <StaffsCreate /> },

    { path: `/${App_Admin}/staffs/create/`, element: <StaffsCreate /> },
    { path: `/${App_Admin}/staffs/create-`, element: <StaffsCreate /> },

    // =======================================================================
    // Details
    { path: `/${App_Admin}/staffs/:staffId`, element: <StaffDetails /> },

    { path: `/${App_Admin}/staffs/:staffId`, element: <StaffDetails /> },
    { path: `/${App_Admin}/staffs/:staffId`, element: <StaffDetails /> },

    // ====================================================================
    // Update
    { path: `/${App_Admin}/staffs/update/:staffId`, element: <StaffUpdate /> },

    { path: `/${App_Admin}/staffs/update/:staffId`, element: <StaffUpdate /> },
    { path: `/${App_Admin}/staffs/update/:staffId`, element: <StaffUpdate /> },

    // ====================================================================
];
