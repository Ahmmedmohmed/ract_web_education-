// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminTestResultsPage from "../../pages/admin/testresults/AdminTestResultsPage";
import TestResultDetails from "../../pages/admin/testresults/details/TestResultDetails";

export const admin_test_results_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/test-results`, element: <AdminTestResultsPage /> },

    { path: `/${App_Admin}/test-results/`, element: <AdminTestResultsPage /> },
    { path: `/${App_Admin}/test-results-`, element: <AdminTestResultsPage /> },
    { path: `/${App_Admin}/test_results`, element: <AdminTestResultsPage /> },
    { path: `/${App_Admin}/test_results/`, element: <AdminTestResultsPage /> },
    { path: `/${App_Admin}/test_results-`, element: <AdminTestResultsPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details
    {
        path: `/${App_Admin}/test-results/:bankId`,
        element: <TestResultDetails />,
    },

    {
        path: `/${App_Admin}/test-results/:bankId/`,
        element: <TestResultDetails />,
    },
    {
        path: `/${App_Admin}/test-results/:bankId-`,
        element: <TestResultDetails />,
    },

    // =====================================================================
    // Update

    // =====================================================================
];
