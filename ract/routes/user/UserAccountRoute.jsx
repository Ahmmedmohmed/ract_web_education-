// utils
import { App_User } from "../../utils/constants";

// component
import UserAccountPage from "../../pages/user/account/UserAccountPage";

export const user_account_route = [
    // ====================================================================
    // List

    // ====================================================================
    // Create

    // ====================================================================
    // Details

    // ====================================================================
    // Update
    { path: `/${App_User}/account`, element: <UserAccountPage /> },
    { path: `/${App_User}/account/:id`, element: <UserAccountPage /> },

    { path: `/${App_User}/account/`, element: <UserAccountPage /> },
    { path: `/${App_User}-account`, element: <UserAccountPage /> },
    { path: `/${App_User}-account/`, element: <UserAccountPage /> },

    // ====================================================================

    // { path: `/${App_User}/updateprofile/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/update/profile/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/update-profile/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/profile/update/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/profile-update/:id`, element: <UserAccountPage /> },

    // { path: `/${App_User}/editprofile/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/edit-profile/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/edit/profile/:id`, element: <UserAccountPage /> },

    // { path: `/${App_User}/profileedit/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/profile-edit/:id`, element: <UserAccountPage /> },
    // { path: `/${App_User}/profile/edit/:id`, element: <UserAccountPage /> },
];
