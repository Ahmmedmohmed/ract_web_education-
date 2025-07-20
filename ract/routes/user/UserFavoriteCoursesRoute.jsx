// utils
import { App_User } from "../../utils/constants";

// component
// Favorite Course
import UserFavoriteCourse from "../../pages/user/favoritecourse/UserFavoriteCourse";

export const user_favorite_courses_route = [
    // ====================================================================
    // List
    { path: `/${App_User}/favoritecourses`, element: <UserFavoriteCourse /> },

    { path: `/${App_User}/favoritecourses/`, element: <UserFavoriteCourse /> },
    { path: `/${App_User}/favoritecourses-`, element: <UserFavoriteCourse /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details

    // ====================================================================
    // Update

    // ====================================================================
];
