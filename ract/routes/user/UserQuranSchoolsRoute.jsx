// utils
import { App_User } from "../../utils/constants";

// component
import UserQuranSchoolsPage from "../../pages/user/quranschools/UserQuranSchoolsPage";
import QuranSchoolDetails from "../../pages/user/quranschools/details/QuranSchoolDetails";

export const user_quran_schools_route = [
    // ====================================================================
    // List
    { path: `/${App_User}/quranschools`, element: <UserQuranSchoolsPage /> },

    { path: `/${App_User}/quranschools/`, element: <UserQuranSchoolsPage /> },
    { path: `/${App_User}/quranschools-`, element: <UserQuranSchoolsPage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    {
        path: `/${App_User}/quranschools/:quranschoolId`,
        element: <QuranSchoolDetails />,
    },

    {
        path: `/${App_User}/quranschools/:quranschoolId/`,
        element: <QuranSchoolDetails />,
    },
    {
        path: `/${App_User}/quranschools-/:quranschoolId`,
        element: <QuranSchoolDetails />,
    },

    // ====================================================================
    // Update

    // ====================================================================
];
