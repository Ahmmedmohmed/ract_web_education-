// utils
import { App_User } from "../../utils/constants";

// component
import UserProfilePage from "../../pages/user/profile/UserProfilePage";

export const user_profile_route = [
    // ====================================================================
    // Update
    { path: `/${App_User}/profile`, element: <UserProfilePage /> },
    { path: `/${App_User}/profile/:id`, element: <UserProfilePage /> },

    { path: `/${App_User}/profile/`, element: <UserProfilePage /> },
    { path: `/${App_User}-profile`, element: <UserProfilePage /> },
    { path: `/${App_User}-profile/`, element: <UserProfilePage /> },

    // ====================================================================
];
