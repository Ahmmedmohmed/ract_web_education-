// utils
import { App_Admin } from "../../utils/constants";

// component
// Courses
import AdminCoursesIsLivePage from "../../pages/admin/coursesislive/AdminCoursesIsLivePage";
import AdminCoursesIsLiveCreate from "../../pages/admin/coursesislive/create/AdminCoursesIsLiveCreate";
import AdminCourseIsLiveUpdate from "../../pages/admin/coursesislive/update/AdminCourseIsLiveUpdate";

export const admin_courses_islive_route = [
    // =====================================================================
    // List
    {
        path: `/${App_Admin}/coursesislive`,
        element: <AdminCoursesIsLivePage />,
    },

    {
        path: `/${App_Admin}/coursesislive/`,
        element: <AdminCoursesIsLivePage />,
    },
    {
        path: `/${App_Admin}/coursesislive-`,
        element: <AdminCoursesIsLivePage />,
    },

    // =====================================================================
    // Create
    {
        path: `/${App_Admin}/coursesislive/create`,
        element: <AdminCoursesIsLiveCreate />,
    },

    {
        path: `/${App_Admin}/coursesislive/create/`,
        element: <AdminCoursesIsLiveCreate />,
    },
    {
        path: `/${App_Admin}/coursesislive/create-`,
        element: <AdminCoursesIsLiveCreate />,
    },

    // =====================================================================
    // Details
    // {
    //     path: `/${App_Admin}/coursesislive/:courseId`,
    //     element: <AdminCourseDetails />,
    // },

    // {
    //     path: `/${App_Admin}/coursesislive/:courseId/`,
    //     element: <AdminCourseDetails />,
    // },
    // {
    //     path: `/${App_Admin}/coursesislive/:courseId-`,
    //     element: <AdminCourseDetails />,
    // },

    // =====================================================================
    // Update
    {
        path: `/${App_Admin}/coursesislive/update/:courseId`,
        element: <AdminCourseIsLiveUpdate />,
    },

    {
        path: `/${App_Admin}/coursesislive/update/:courseId/`,
        element: <AdminCourseIsLiveUpdate />,
    },
    {
        path: `/${App_Admin}/coursesislive/update/:courseId-`,
        element: <AdminCourseIsLiveUpdate />,
    },

    // =====================================================================
];
