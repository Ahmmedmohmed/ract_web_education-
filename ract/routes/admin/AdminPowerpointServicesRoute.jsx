// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminPowerpointservicesPage from "../../pages/admin/powerpointservices/AdminPowerpointservicesPage";

export const admin_powerpoint_services_route = [
    // =====================================================================
    // List
    {
        path: `/${App_Admin}/powerpointservices`,
        element: <AdminPowerpointservicesPage />,
    },

    {
        path: `/${App_Admin}/powerpointservices/`,
        element: <AdminPowerpointservicesPage />,
    },
    {
        path: `/${App_Admin}/powerpointservices-`,
        element: <AdminPowerpointservicesPage />,
    },

    // =====================================================================
    // Create
    // { path: `/${App_Admin}/powerpointservices/create`, element: <ContactsAdminPage /> },

    // { path: `/${App_Admin}/powerpointservices/create/`, element: <ContactsAdminPage /> },
    // { path: `/${App_Admin}/powerpointservices/create-`, element: <ContactsAdminPage /> },

    // =====================================================================
    // Details
    // {
    //     path: `/${App_Admin}/powerpointservices/:powerpointId`,
    //     element: <PowerpointserviceDetails />,
    // },

    // {
    //     path: `/${App_Admin}/powerpointservices/:powerpointId/`,
    //     element: <PowerpointserviceDetails />,
    // },
    // {
    //     path: `/${App_Admin}/powerpointservices/:powerpointId-`,
    //     element: <PowerpointserviceDetails />,
    // },

    // =====================================================================
    // Update
    // {
    //     path: `/${App_Admin}/powerpointservices/update/:powerpointId`,
    //     element: <ContactsAdminPage />,
    // },

    // {
    //     path: `/${App_Admin}/powerpointservices/update/:powerpointId/`,
    //     element: <ContactsAdminPage />,
    // },
    // {
    //     path: `/${App_Admin}/powerpointservices/update/:powerpointId-`,
    //     element: <ContactsAdminPage />,
    // },

    // =====================================================================
];
