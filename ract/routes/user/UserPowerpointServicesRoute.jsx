// utils
import { App_User } from "../../utils/constants";

// component
import UserPowerpointservicesPage from "../../pages/user/powerpointservices/UserPowerpointservicesPage";
import PowerpointservicesCreate from "../../pages/user/powerpointservices/create/PowerpointservicesCreate";
import PowerpointserviceUpdate from "../../pages/user/powerpointservices/update/PowerpointserviceUpdate";

export const user_powerpoint_services_route = [
    // =====================================================================
    // List
    {
        path: `/${App_User}/powerpointservices`,
        element: <UserPowerpointservicesPage />,
    },

    {
        path: `/${App_User}/powerpointservices/`,
        element: <UserPowerpointservicesPage />,
    },
    {
        path: `/${App_User}/powerpointservices-`,
        element: <UserPowerpointservicesPage />,
    },

    // =====================================================================
    // Create
    {
        path: `/${App_User}/powerpointservices/create`,
        element: <PowerpointservicesCreate />,
    },

    {
        path: `/${App_User}/powerpointservices/create/`,
        element: <PowerpointservicesCreate />,
    },
    {
        path: `/${App_User}/powerpointservices/create-`,
        element: <PowerpointservicesCreate />,
    },

    // =====================================================================
    // Details
    // {
    //     path: `/${App_User}/powerpointservices/:proofreadingId`,
    //     element: <ProofreadingserviceDetails />,
    // },

    // {
    //     path: `/${App_User}/powerpointservices/:proofreadingId/`,
    //     element: <ProofreadingserviceDetails />,
    // },
    // {
    //     path: `/${App_User}/powerpointservices/:proofreadingId-`,
    //     element: <ProofreadingserviceDetails />,
    // },

    // =====================================================================
    // Update
    {
        path: `/${App_User}/powerpointservices/update/:proofreadingId`,
        element: <PowerpointserviceUpdate />,
    },

    {
        path: `/${App_User}/powerpointservices/update/:proofreadingId/`,
        element: <PowerpointserviceUpdate />,
    },
    {
        path: `/${App_User}/powerpointservices/update/:proofreadingId-`,
        element: <PowerpointserviceUpdate />,
    },

    // =====================================================================
];
