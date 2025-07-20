// component
// Powerpoints
import PowerpointsPage from "../../pages/app/powerpointspage/PowerpointsPage";
import PowerpointDetails from "../../pages/app/powerpointspage/details/PowerpointDetails";

export const powerpoints_route = [
    // ====================================================================
    // List
    { path: "/powerpoints", element: <PowerpointsPage /> },

    { path: "/powerpoints/", element: <PowerpointsPage /> },
    { path: "/powerpoints-", element: <PowerpointsPage /> },

    { path: "/powerpointspage", element: <PowerpointsPage /> },
    { path: "/powerpoints/page", element: <PowerpointsPage /> },
    { path: "/powerpoints-page", element: <PowerpointsPage /> },

    { path: "/pagepowerpoints", element: <PowerpointsPage /> },
    { path: "/page-powerpoints", element: <PowerpointsPage /> },
    { path: "/page/powerpoints", element: <PowerpointsPage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    { path: "/powerpoints/:powerpointId", element: <PowerpointDetails /> },

    { path: "/powerpoints/:powerpointId/", element: <PowerpointDetails /> },
    { path: "/powerpoints/:powerpointId-", element: <PowerpointDetails /> },

    { path: "/powerpointspage/:powerpointId", element: <PowerpointDetails /> },
    { path: "/powerpoints/page/:powerpointId", element: <PowerpointDetails /> },
    { path: "/powerpoints-page/:powerpointId", element: <PowerpointDetails /> },

    { path: "/pagepowerpoints/:powerpointId", element: <PowerpointDetails /> },
    { path: "/page-powerpoints/:powerpointId", element: <PowerpointDetails /> },
    { path: "/page/powerpoints/:powerpointId", element: <PowerpointDetails /> },

    // ====================================================================
    // Update

    // ====================================================================
];
