// utils
import { App_User } from "../../utils/constants";

// component
import UserPowerpointsPage from "../../pages/user/powerpoint/UserPowerpointsPage";

export const user_powerpoints_route = [
    // =======================================================================
    // List
    { path: `/${App_User}/powerpoints`, element: <UserPowerpointsPage /> },

    { path: `/${App_User}/powerpoints/`, element: <UserPowerpointsPage /> },
    { path: `/${App_User}/powerpoints-`, element: <UserPowerpointsPage /> },

    // =======================================================================
    // Create
    // {
    //     path: `/${App_User}/powerpoints/create`,
    //     element: <PowerpointsCreate />,
    // },

    // {
    //     path: `/${App_User}/powerpoints/create/`,
    //     element: <PowerpointsCreate />,
    // },
    // {
    //     path: `/${App_User}/powerpoints/create-`,
    //     element: <PowerpointsCreate />,
    // },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_User}/powerpoints/:powerpointId`,
    //     element: <PowerpointDetails />,
    // },

    // {
    //     path: `/${App_User}/powerpoints/:powerpointId/`,
    //     element: <PowerpointDetails />,
    // },
    // {
    //     path: `/${App_User}/powerpoints/:powerpointId-`,
    //     element: <PowerpointDetails />,
    // },

    // =======================================================================
    // Update
    // {
    //     path: `/${App_User}/powerpoints/update/:powerpointId`,
    //     element: <PowerpointUpdate />,
    // },

    // {
    //     path: `/${App_User}/powerpoints/update/:powerpointId/`,
    //     element: <PowerpointUpdate />,
    // },
    // {
    //     path: `/${App_User}/powerpoints/update/:powerpointId-`,
    //     element: <PowerpointUpdate />,
    // },

    // =======================================================================
];
