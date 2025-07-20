// utils
import { App_User } from "../../utils/constants";

// component
// Courses
import UserCoursesPage from "../../pages/user/courses/UserCoursesPage";
import CoursesDetailsUserPage from "../../pages/user/coursedetails/CoursesDetailsUserPage";

// Lessons
import Duties from "../../pages/user/coursedetails/duties/Duties";

// Chat
import StudentChatPage from "../../pages/user/coursedetails/chat/StudentChatPage";

export const user_courses_route = [
    // ====================================================================
    // List
    { path: `/${App_User}/courses`, element: <UserCoursesPage /> },

    { path: `/${App_User}/courses/`, element: <UserCoursesPage /> },
    { path: `/${App_User}/courses-`, element: <UserCoursesPage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    {
        path: `/${App_User}/courses/:courseId`,
        element: <CoursesDetailsUserPage />,
    },

    {
        path: `/${App_User}/courses/:courseId/`,
        element: <CoursesDetailsUserPage />,
    },
    {
        path: `/${App_User}/courses-/:courseId`,
        element: <CoursesDetailsUserPage />,
    },

    // ====================================================================
    // Update

    // ====================================================================
    // ====================================================================
    // (Chat) Send
    {
        path: `/${App_User}/courses/:courseId/lessons/:lessonId/students/duties`,
        element: <Duties />,
    },

    // ====================================================================
    // ====================================================================
    // (Chat) Send
    {
        path: `/${App_User}/courses/:courseId/students/chat/:teacherId/:studentId`,
        element: <StudentChatPage />,
    },

    // ====================================================================
];
