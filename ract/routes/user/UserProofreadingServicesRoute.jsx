// utils
import { App_User } from "../../utils/constants";

// component
import UserProofreadingservicesPage from "../../pages/user/proofreadingservices/UserProofreadingservicesPage";
import ProofreadingservicesCreate from "../../pages/user/proofreadingservices/create/ProofreadingservicesCreate";
import ProofreadingserviceUpdate from "../../pages/user/proofreadingservices/update/ProofreadingserviceUpdate";
// import ProofreadingserviceDetails from "../../pages/user/proofreadingservices/details/ProofreadingserviceDetails";

export const user_proofreading_services_route = [
    // =====================================================================
    // List
    {
        path: `/${App_User}/proofreadingservices`,
        element: <UserProofreadingservicesPage />,
    },

    {
        path: `/${App_User}/proofreadingservices/`,
        element: <UserProofreadingservicesPage />,
    },
    {
        path: `/${App_User}/proofreadingservices-`,
        element: <UserProofreadingservicesPage />,
    },

    // =====================================================================
    // Create
    {
        path: `/${App_User}/proofreadingservices/create`,
        element: <ProofreadingservicesCreate />,
    },

    {
        path: `/${App_User}/proofreadingservices/create/`,
        element: <ProofreadingservicesCreate />,
    },
    {
        path: `/${App_User}/proofreadingservices/create-`,
        element: <ProofreadingservicesCreate />,
    },

    // =====================================================================
    // Details
    // {
    //     path: `/${App_User}/proofreadingservices/:proofreadingId`,
    //     element: <ProofreadingserviceDetails />,
    // },

    // {
    //     path: `/${App_User}/proofreadingservices/:proofreadingId/`,
    //     element: <ProofreadingserviceDetails />,
    // },
    // {
    //     path: `/${App_User}/proofreadingservices/:proofreadingId-`,
    //     element: <ProofreadingserviceDetails />,
    // },

    // =====================================================================
    // Update
    {
        path: `/${App_User}/proofreadingservices/update/:proofreadingId`,
        element: <ProofreadingserviceUpdate />,
    },

    {
        path: `/${App_User}/proofreadingservices/update/:proofreadingId/`,
        element: <ProofreadingserviceUpdate />,
    },
    {
        path: `/${App_User}/proofreadingservices/update/:proofreadingId-`,
        element: <ProofreadingserviceUpdate />,
    },

    // =====================================================================
];
