// utils
import { App_Admin } from "../../utils/constants";

// component
// Courses
import AdminCoursesPage from "../../pages/admin/courses/AdminCoursesPage";
import AdminCoursesCreate from "../../pages/admin/courses/create/AdminCoursesCreate";
import AdminCourseDetails from "../../pages/admin/courses/details/AdminCourseDetails";
import AdminCourseUpdate from "../../pages/admin/courses/update/AdminCourseUpdate";

// Sections
import CourseSectionsCreate from "../../pages/admin/courses/details/sections/create/CourseSectionsCreate";
import CourseSectionUpdate from "../../pages/admin/courses/details/sections/update/CourseSectionUpdate";

// Lessons
import CourseLessonsList from "../../pages/admin/courses/details/lessons/list/CourseLessonsList";
import CourseLessonsCreate from "../../pages/admin/courses/details/lessons/create/CourseLessonsCreate";
import CourseLessonUpdate from "../../pages/admin/courses/details/lessons/update/CourseLessonUpdate";

// Students
import StudentsEnrolledList from "../../pages/admin/courses/details/students/list/StudentsEnrolledList";
import StudentsEnrolledCreate from "../../pages/admin/courses/details/students/create/StudentsEnrolledCreate";
import StudentAnswers from "../../pages/admin/courses/details/students/answers/StudentAnswers";

// Chats
import AdminChatPage from "../../pages/admin/courses/details/chat/AdminChatPage";

export const admin_courses_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/courses`, element: <AdminCoursesPage /> },

    { path: `/${App_Admin}/courses/`, element: <AdminCoursesPage /> },
    { path: `/${App_Admin}/courses-`, element: <AdminCoursesPage /> },

    // =====================================================================
    // Create
    { path: `/${App_Admin}/courses/create`, element: <AdminCoursesCreate /> },

    { path: `/${App_Admin}/courses/create/`, element: <AdminCoursesCreate /> },
    { path: `/${App_Admin}/courses/create-`, element: <AdminCoursesCreate /> },

    // =====================================================================
    // Details
    {
        path: `/${App_Admin}/courses/:courseId`,
        element: <AdminCourseDetails />,
    },

    {
        path: `/${App_Admin}/courses/:courseId/`,
        element: <AdminCourseDetails />,
    },
    {
        path: `/${App_Admin}/courses/:courseId-`,
        element: <AdminCourseDetails />,
    },

    // =====================================================================
    // Update
    {
        path: `/${App_Admin}/courses/update/:courseId`,
        element: <AdminCourseUpdate />,
    },

    {
        path: `/${App_Admin}/courses/update/:courseId/`,
        element: <AdminCourseUpdate />,
    },
    {
        path: `/${App_Admin}/courses/update/:courseId-`,
        element: <AdminCourseUpdate />,
    },

    // =====================================================================
    // =====================================================================
    // (Sections) List
    // {
    //     path: `/${App_Admin}/courses/:courseId/sections`,
    //     element: <CourseSectionsList />,
    // },

    // {
    //     path: `/${App_Admin}/courses/:courseId/sections/`,
    //     element: <CourseSectionsList />,
    // },
    // {
    //     path: `/${App_Admin}/courses/:courseId/sections-`,
    //     element: <CourseSectionsList />,
    // },

    // =====================================================================
    // (Sections) Create
    {
        path: `/${App_Admin}/courses/:courseId/sections/create`,
        element: <CourseSectionsCreate />,
    },

    // =====================================================================
    // (Sections) Details
    // {
    //     path: `/${App_Admin}/courses/:courseId/sections/:sectionId`,
    //     element: <CourseSectionDetails />,
    // },

    // =====================================================================
    // (Sections) Update
    {
        path: `/${App_Admin}/courses/:courseId/sections/update/:sectionId`,
        element: <CourseSectionUpdate />,
    },

    // =====================================================================
    // =====================================================================
    // (Lessons) List
    {
        path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons`,
        element: <CourseLessonsList />,
    },

    // =====================================================================
    // (Lessons) Create
    {
        path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons/create`,
        element: <CourseLessonsCreate />,
    },

    // =====================================================================
    // (Lessons) Details
    // {
    //     path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons/:lessonId`,
    //     element: <CourseLessonDetails />,
    // },

    // =====================================================================
    // (Lessons) Update
    {
        path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons/update/:lessonId`,
        element: <CourseLessonUpdate />,
    },

    // =====================================================================
    // =====================================================================
    // (Students) List
    {
        path: `/${App_Admin}/courses/:courseId/students`,
        element: <StudentsEnrolledList />,
    },

    {
        path: `/${App_Admin}/courses/:courseId/students/`,
        element: <StudentsEnrolledList />,
    },
    {
        path: `/${App_Admin}/courses/:courseId/students-`,
        element: <StudentsEnrolledList />,
    },

    // =====================================================================
    // (Students) Create
    {
        path: `/${App_Admin}/courses/students/create`,
        element: <StudentsEnrolledCreate />,
    },

    {
        path: `/${App_Admin}/courses/students/create/`,
        element: <StudentsEnrolledCreate />,
    },
    {
        path: `/${App_Admin}/courses/students/create-`,
        element: <StudentsEnrolledCreate />,
    },

    // =====================================================================
    // (Students) Answers
    {
        path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons/:lessonId/students/answers`,
        element: <StudentAnswers />,
    },
   
    {
        path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons/:lessonId/students/answers/`,
        element: <StudentAnswers />,
    },
    {
        path: `/${App_Admin}/courses/:courseId/sections/:sectionId/lessons/:lessonId/students/answers-`,
        element: <StudentAnswers />,
    },

   
    // =====================================================================
    // =====================================================================
    // (Chat) Send
    {
        path: `/${App_Admin}/courses/:courseId/students/chat/:teacherId/:studentId`,
        element: <AdminChatPage />,
    },

    // =====================================================================
];
