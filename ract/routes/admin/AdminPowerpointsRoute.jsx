// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminPowerpointsPage from "../../pages/admin/powerpoint/AdminPowerpointsPage";
import PowerpointsCreate from "../../pages/admin/powerpoint/create/PowerpointsCreate";
import PowerpointUpdate from "../../pages/admin/powerpoint/update/PowerpointUpdate";

export const admin_powerpoints_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/powerpoints`, element: <AdminPowerpointsPage /> },

    { path: `/${App_Admin}/powerpoints/`, element: <AdminPowerpointsPage /> },
    { path: `/${App_Admin}/powerpoints-`, element: <AdminPowerpointsPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/powerpoints/create`,
        element: <PowerpointsCreate />,
    },

    {
        path: `/${App_Admin}/powerpoints/create/`,
        element: <PowerpointsCreate />,
    },
    {
        path: `/${App_Admin}/powerpoints/create-`,
        element: <PowerpointsCreate />,
    },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_Admin}/powerpoints/:powerpointId`,
    //     element: <PowerpointDetails />,
    // },

    // {
    //     path: `/${App_Admin}/powerpoints/:powerpointId/`,
    //     element: <PowerpointDetails />,
    // },
    // {
    //     path: `/${App_Admin}/powerpoints/:powerpointId-`,
    //     element: <PowerpointDetails />,
    // },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/powerpoints/update/:powerpointId`,
        element: <PowerpointUpdate />,
    },

    {
        path: `/${App_Admin}/powerpoints/update/:powerpointId/`,
        element: <PowerpointUpdate />,
    },
    {
        path: `/${App_Admin}/powerpoints/update/:powerpointId-`,
        element: <PowerpointUpdate />,
    },

    // =======================================================================
];
