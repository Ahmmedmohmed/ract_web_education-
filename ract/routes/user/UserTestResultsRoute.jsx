// utils
import { App_User } from "../../utils/constants";

// component
import UserTestResultsPage from "../../pages/user/testresults/UserTestResultsPage";
import TestResultDetails from "../../pages/user/testresults/details/TestResultDetails";

export const user_test_results_route = [
    // =====================================================================
    // List
    { path: `/${App_User}/test-results`, element: <UserTestResultsPage /> },

    { path: `/${App_User}/test-results/`, element: <UserTestResultsPage /> },
    { path: `/${App_User}/test-results-`, element: <UserTestResultsPage /> },
    { path: `/${App_User}/test_results`, element: <UserTestResultsPage /> },
    { path: `/${App_User}/test_results/`, element: <UserTestResultsPage /> },
    { path: `/${App_User}/test_results-`, element: <UserTestResultsPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details
    {
        path: `/${App_User}/test-results/:bankId`,
        element: <TestResultDetails />,
    },

    {
        path: `/${App_User}/test-results/:bankId/`,
        element: <TestResultDetails />,
    },
    {
        path: `/${App_User}/test-results/:bankId-`,
        element: <TestResultDetails />,
    },

    // =====================================================================
    // Update

    // =====================================================================
];
