// utils
import { App_Admin } from "../../utils/constants";

// component
import AccountsStudentsPage from "../../pages/admin/accounts/students/AccountsStudentsPage";
import StudentsCreate from "../../pages/admin/accounts/students/create/StudentsCreate";
import StudentDetails from "../../pages/admin/accounts/students/details/StudentDetails";
import StudentUpdate from "../../pages/admin/accounts/students/update/StudentUpdate";

export const admin_students_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/students`, element: <AccountsStudentsPage /> },

    { path: `/${App_Admin}/students/`, element: <AccountsStudentsPage /> },
    { path: `/${App_Admin}/students-`, element: <AccountsStudentsPage /> },

    // ====================================================================
    // Create
    { path: `/${App_Admin}/students/create`, element: <StudentsCreate /> },

    { path: `/${App_Admin}/students/create/`, element: <StudentsCreate /> },
    { path: `/${App_Admin}/students/create-`, element: <StudentsCreate /> },

    // =======================================================================
    // Details
    { path: `/${App_Admin}/students/:studentId`, element: <StudentDetails /> },

    { path: `/${App_Admin}/students/:studentId`, element: <StudentDetails /> },
    { path: `/${App_Admin}/students/:studentId`, element: <StudentDetails /> },

    // ====================================================================
    // Update
    {
        path: `/${App_Admin}/students/update/:studentId`,
        element: <StudentUpdate />,
    },

    {
        path: `/${App_Admin}/students/update/:studentId`,
        element: <StudentUpdate />,
    },
    {
        path: `/${App_Admin}/students/update/:studentId`,
        element: <StudentUpdate />,
    },

    // ====================================================================
];
