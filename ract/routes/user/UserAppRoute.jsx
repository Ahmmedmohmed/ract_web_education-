// utils
import { App_User } from "../../utils/constants";

// component
import AppUser from "../../pages/user/AppUser";

export const user_app_route = [
    // ====================================================================
    // Details
    { path: `/${App_User}/home`, element: <AppUser /> },

    { path: `/user`, element: <AppUser /> },
    { path: `/${App_User}`, element: <AppUser /> },

    { path: `${App_User}`, element: <AppUser /> },
    { path: `/${App_User}`, element: <AppUser /> },
    { path: `${App_User}/`, element: <AppUser /> },
    { path: `/${App_User}/`, element: <AppUser /> },

    // ====================================================================
    //

    // { path: `/user/profile`, element: <AppUser /> },
    // { path: `/${App_User}/profile`, element: <AppUser /> },

    // { path: `/${App_User}/profile`, element: <AppUser /> },
    // { path: `/${App_User}/profile/:id`, element: <AppUser /> },

    // { path: `/${App_User}/${App_User}/profile`, element: <AppUser /> },
    // { path: `/${App_User}/${App_User}-profile`, element: <AppUser /> },
    // { path: `/${App_User}-${App_User}/profile`, element: <AppUser /> },
    // { path: `/${App_User}/${App_User}/profile/:id`, element: <AppUser /> },

    // { path: `/${App_User}profile`, element: <AppUser /> },
    // { path: `/${App_User}profile/:id`, element: <AppUser /> },
    // { path: `/${App_User}-profile`, element: <AppUser /> },
    // { path: `/${App_User}-profile/:id`, element: <AppUser /> },

    // { path: `/${App_User}/${App_User}profile`, element: <AppUser /> },
    // { path: `/${App_User}-${App_User}profile`, element: <AppUser /> },
    // { path: `/${App_User}/${App_User}profile/:id`, element: <AppUser /> },
];
