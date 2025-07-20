// utils
import { App_User } from "../../utils/constants";

// component
import UserHelpPage from "../../pages/user/help/UserHelpPage";

export const user_help_route = [
    // ====================================================================
    // Details
    { path: `/${App_User}/help`, element: <UserHelpPage /> },

    { path: `/${App_User}/help/`, element: <UserHelpPage /> },
    { path: `/${App_User}/help-`, element: <UserHelpPage /> },

    // ====================================================================
];
