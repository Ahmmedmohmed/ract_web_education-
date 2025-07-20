// component
// Courses
import CoursesPage from "../../pages/app/coursespage/CoursesPage";
import CourseDetails from "../../pages/app/coursespage/details/CourseDetails";

// Courses Is Free
import CoursesIsFreePage from "../../pages/app/coursesisfree/CoursesIsFreePage";

// Courses Is Live
import CoursesIsLivePage from "../../pages/app/coursesislivepage/CoursesIsLivePage";
import CourseIsLiveDetails from "../../pages/app/coursesislivepage/details/CourseIsLiveDetails";

export const courses_route = [
    // ====================================================================
    // List
    { path: "/courses", element: <CoursesPage /> },

    { path: "/coursespage", element: <CoursesPage /> },
    { path: "/courses/page", element: <CoursesPage /> },
    { path: "/courses-page", element: <CoursesPage /> },

    { path: "/pagecourses", element: <CoursesPage /> },
    { path: "/page-courses", element: <CoursesPage /> },
    { path: "/page/courses", element: <CoursesPage /> },

    // ====================================================================
    // Details
    { path: "/courses/:courseId", element: <CourseDetails /> },

    { path: "/coursespage/:courseId", element: <CourseDetails /> },
    { path: "/courses/page/:courseId", element: <CourseDetails /> },
    { path: "/courses-page/:courseId", element: <CourseDetails /> },

    { path: "/pagecourses/:courseId", element: <CourseDetails /> },
    { path: "/page-courses/:courseId", element: <CourseDetails /> },
    { path: "/page/courses/:courseId", element: <CourseDetails /> },

    // ====================================================================
    //
    // ====================================================================
    // ====================================================================
    // (Courses Is Free) List
    { path: "/coursesisfree", element: <CoursesIsFreePage /> },

    { path: "/coursesisfree-", element: <CoursesIsFreePage /> },
    { path: "/coursesisfree/", element: <CoursesIsFreePage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // (Courses Is Free) Details
    // {
    //     path: "/coursesisfree/:coursesisfeeId",
    //     element: <CourseIsLiveDetails />,
    // },

    // {
    //     path: "/coursesisfree/:coursesisfeeId-",
    //     element: <CourseIsLiveDetails />,
    // },
    // {
    //     path: "/coursesisfree/:coursesisfeeId/",
    //     element: <CourseIsLiveDetails />,
    // },

    // ====================================================================
    // Update

    // ====================================================================
    // ====================================================================
    // (Courses Is Live) List
    { path: "/coursesislive", element: <CoursesIsLivePage /> },

    { path: "/coursesislive-", element: <CoursesIsLivePage /> },
    { path: "/coursesislive/", element: <CoursesIsLivePage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // (Courses Is Live) Details
    {
        path: "/coursesislive/:coursesisliveId",
        element: <CourseIsLiveDetails />,
    },

    {
        path: "/coursesislive/:coursesisliveId-",
        element: <CourseIsLiveDetails />,
    },
    {
        path: "/coursesislive/:coursesisliveId/",
        element: <CourseIsLiveDetails />,
    },

    // ====================================================================
    // Update

    // ====================================================================
];
