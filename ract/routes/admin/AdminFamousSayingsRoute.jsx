// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminFamousSayingsPage from "../../pages/admin/famoussayings/AdminFamousSayingsPage";
import FamousSayingsCreate from "../../pages/admin/famoussayings/create/FamousSayingsCreate";
import FamousSayingUpdate from "../../pages/admin/famoussayings/update/FamousSayingUpdate";

export const admin_famous_sayings_route = [
    // =======================================================================
    // List
    {
        path: `/${App_Admin}/famoussayings`,
        element: <AdminFamousSayingsPage />,
    },

    {
        path: `/${App_Admin}/famoussayings/`,
        element: <AdminFamousSayingsPage />,
    },
    {
        path: `/${App_Admin}/famoussayings-`,
        element: <AdminFamousSayingsPage />,
    },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/famoussayings/create`,
        element: <FamousSayingsCreate />,
    },

    {
        path: `/${App_Admin}/famoussayings/create/`,
        element: <FamousSayingsCreate />,
    },
    {
        path: `/${App_Admin}/famoussayings/create-`,
        element: <FamousSayingsCreate />,
    },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_Admin}/famoussayings/:famoussayingId`,
    //     element: <PowerpointDetails />,
    // },

    // {
    //     path: `/${App_Admin}/famoussayings/:famoussayingId/`,
    //     element: <PowerpointDetails />,
    // },
    // {
    //     path: `/${App_Admin}/famoussayings/:famoussayingId-`,
    //     element: <PowerpointDetails />,
    // },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/famoussayings/update/:famoussayingId`,
        element: <FamousSayingUpdate />,
    },

    {
        path: `/${App_Admin}/famoussayings/update/:famoussayingId/`,
        element: <FamousSayingUpdate />,
    },
    {
        path: `/${App_Admin}/famoussayings/update/:famoussayingId-`,
        element: <FamousSayingUpdate />,
    },

    // =======================================================================
];
