// utils
import { App_Admin } from "../../utils/constants";

// component
import AccountsTeachersPage from "../../pages/admin/accounts/teachers/AccountsTeachersPage";
import TeachersCreate from "../../pages/admin/accounts/teachers/create/TeachersCreate";
import TeacherDetails from "../../pages/admin/accounts/teachers/details/TeacherDetails";
import TeacherUpdate from "../../pages/admin/accounts/teachers/update/TeacherUpdate";

export const admin_teachers_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/teachers`, element: <AccountsTeachersPage /> },

    { path: `/${App_Admin}/teachers/`, element: <AccountsTeachersPage /> },
    { path: `/${App_Admin}/teachers-`, element: <AccountsTeachersPage /> },

    // ====================================================================
    // Create
    { path: `/${App_Admin}/teachers/create`, element: <TeachersCreate /> },
    { path: `/${App_Admin}/teachers/create/`, element: <TeachersCreate /> },
    { path: `/${App_Admin}/teachers/create-`, element: <TeachersCreate /> },

    // =======================================================================
    // Details
    { path: `/${App_Admin}/teachers/:teacherId`, element: <TeacherDetails /> },
    { path: `/${App_Admin}/teachers/:teacherId/`, element: <TeacherDetails /> },
    { path: `/${App_Admin}/teachers/:teacherId-`, element: <TeacherDetails /> },

    // ====================================================================
    // Update
    {
        path: `/${App_Admin}/teachers/update/:teacherId`,
        element: <TeacherUpdate />,
    },
    {
        path: `/${App_Admin}/teachers/update/:teacherId/`,
        element: <TeacherUpdate />,
    },
    {
        path: `/${App_Admin}/teachers/update/:teacherId-`,
        element: <TeacherUpdate />,
    },

    // ====================================================================
];
