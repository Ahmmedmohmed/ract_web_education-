// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminProofreadingservicesPage from "../../pages/admin/proofreadingservices/AdminProofreadingservicesPage";
import ProofreadingserviceDetails from "../../pages/admin/proofreadingservices/details/ProofreadingserviceDetails";

export const admin_proofreading_services_route = [
    // =====================================================================
    // List
    {
        path: `/${App_Admin}/proofreadingservices`,
        element: <AdminProofreadingservicesPage />,
    },

    {
        path: `/${App_Admin}/proofreadingservices/`,
        element: <AdminProofreadingservicesPage />,
    },
    {
        path: `/${App_Admin}/proofreadingservices-`,
        element: <AdminProofreadingservicesPage />,
    },

    // =====================================================================
    // Create
    // { path: `/${App_Admin}/proofreadingservices/create`, element: <ContactsAdminPage /> },

    // { path: `/${App_Admin}/proofreadingservices/create/`, element: <ContactsAdminPage /> },
    // { path: `/${App_Admin}/proofreadingservices/create-`, element: <ContactsAdminPage /> },

    // =====================================================================
    // Details
    {
        path: `/${App_Admin}/proofreadingservices/:proofreadingId`,
        element: <ProofreadingserviceDetails />,
    },

    {
        path: `/${App_Admin}/proofreadingservices/:proofreadingId/`,
        element: <ProofreadingserviceDetails />,
    },
    {
        path: `/${App_Admin}/proofreadingservices/:proofreadingId-`,
        element: <ProofreadingserviceDetails />,
    },

    // =====================================================================
    // Update
    // {
    //     path: `/${App_Admin}/proofreadingservices/update/:proofreadingId`,
    //     element: <ContactsAdminPage />,
    // },

    // {
    //     path: `/${App_Admin}/proofreadingservices/update/:proofreadingId/`,
    //     element: <ContactsAdminPage />,
    // },
    // {
    //     path: `/${App_Admin}/proofreadingservices/update/:proofreadingId-`,
    //     element: <ContactsAdminPage />,
    // },

    // =====================================================================
];
