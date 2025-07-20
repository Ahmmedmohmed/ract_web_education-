// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminSectionsList from "../../pages/admin/sections/list/AdminSectionsList";
import AdminSectionCreate from "../../pages/admin/sections/create/AdminSectionCreate";
import AdminSectionDetails from "../../pages/admin/sections/details/AdminSectionDetails";
import AdminSectionUpdate from "../../pages/admin/sections/update/AdminSectionUpdate";

export const admin_sections_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/sections`, element: <AdminSectionsList /> },

    { path: `/${App_Admin}/sections/`, element: <AdminSectionsList /> },
    { path: `/${App_Admin}/sections-`, element: <AdminSectionsList /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/sections/create`,
        element: <AdminSectionCreate />,
    },

    {
        path: `/${App_Admin}/sections/create/`,
        element: <AdminSectionCreate />,
    },
    {
        path: `/${App_Admin}/sections/create-`,
        element: <AdminSectionCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/sections/:sectionId`,
        element: <AdminSectionDetails />,
    },

    {
        path: `/${App_Admin}/sections/:sectionId/`,
        element: <AdminSectionDetails />,
    },
    {
        path: `/${App_Admin}/sections/:sectionId-`,
        element: <AdminSectionDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/sections/update/:sectionId`,
        element: <AdminSectionUpdate />,
    },

    {
        path: `/${App_Admin}/sections/update/:sectionId/`,
        element: <AdminSectionUpdate />,
    },
    {
        path: `/${App_Admin}/sections/update/:sectionId-`,
        element: <AdminSectionUpdate />,
    },

    // =======================================================================
];
