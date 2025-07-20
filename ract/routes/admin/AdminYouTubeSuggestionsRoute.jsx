// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminYouTubeSuggestionsPage from "../../pages/admin/youTubesuggestions/AdminYouTubeSuggestionsPage";
import YouTubeSuggestionsCreate from "../../pages/admin/youTubesuggestions/create/YouTubeSuggestionsCreate";
import YouTubeSuggestionUpdate from "../../pages/admin/youTubesuggestions/update/YouTubeSuggestionUpdate";

export const admin_youTube_suggestions_route = [
    // =======================================================================
    // List
    {
        path: `/${App_Admin}/youTubesuggestions`,
        element: <AdminYouTubeSuggestionsPage />,
    },

    {
        path: `/${App_Admin}/youTubesuggestions/`,
        element: <AdminYouTubeSuggestionsPage />,
    },
    {
        path: `/${App_Admin}/youTubesuggestions-`,
        element: <AdminYouTubeSuggestionsPage />,
    },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/youTubesuggestions/create`,
        element: <YouTubeSuggestionsCreate />,
    },

    {
        path: `/${App_Admin}/youTubesuggestions/create/`,
        element: <YouTubeSuggestionsCreate />,
    },
    {
        path: `/${App_Admin}/youTubesuggestions/create-`,
        element: <YouTubeSuggestionsCreate />,
    },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_Admin}/youTubesuggestions/:suggestionId`,
    //     element: <YouTubeSuggestionsDetails />,
    // },

    // {
    //     path: `/${App_Admin}/youTubesuggestions/:suggestionId/`,
    //     element: <YouTubeSuggestionsDetails />,
    // },
    // {
    //     path: `/${App_Admin}/youTubesuggestions/:suggestionId-`,
    //     element: <YouTubeSuggestionsDetails />,
    // },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/youTubesuggestions/update/:suggestionId`,
        element: <YouTubeSuggestionUpdate />,
    },

    {
        path: `/${App_Admin}/youTubesuggestions/update/:suggestionId/`,
        element: <YouTubeSuggestionUpdate />,
    },
    {
        path: `/${App_Admin}/youTubesuggestions/update/:suggestionId-`,
        element: <YouTubeSuggestionUpdate />,
    },

    // =======================================================================
];
