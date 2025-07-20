// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminCategoriesList from "../../pages/admin/categories/list/AdminCategoriesList";
import AdminCategoryCreate from "../../pages/admin/categories/create/AdminCategoryCreate";
import AdminCategoryDetails from "../../pages/admin/categories/details/AdminCategoryDetails";
import AdminCategoryUpdate from "../../pages/admin/categories/update/AdminCategoryUpdate";

export const admin_categories_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/categories`, element: <AdminCategoriesList /> },

    { path: `/${App_Admin}/categories/`, element: <AdminCategoriesList /> },
    { path: `/${App_Admin}/categories-`, element: <AdminCategoriesList /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/categories/create`,
        element: <AdminCategoryCreate />,
    },

    {
        path: `/${App_Admin}/categories/create/`,
        element: <AdminCategoryCreate />,
    },
    {
        path: `/${App_Admin}/categories/create-`,
        element: <AdminCategoryCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/categories/:categoryId`,
        element: <AdminCategoryDetails />,
    },

    {
        path: `/${App_Admin}/categories/:categoryId/`,
        element: <AdminCategoryDetails />,
    },
    {
        path: `/${App_Admin}/categories/:categoryId-`,
        element: <AdminCategoryDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/categories/update/:categoryId`,
        element: <AdminCategoryUpdate />,
    },

    {
        path: `/${App_Admin}/categories/update/:categoryId/`,
        element: <AdminCategoryUpdate />,
    },
    {
        path: `/${App_Admin}/categories/update/:categoryId-`,
        element: <AdminCategoryUpdate />,
    },

    // =====================================================================
];
