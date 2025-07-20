// utils
import { App_Admin } from "../../utils/constants";

// component 
import AdminBlogsPage from "../../pages/admin/blogs/AdminBlogsPage";
import BlogsCreate from "../../pages/admin/blogs/create/BlogsCreate";
import BlogUpdate from "../../pages/admin/blogs/update/BlogUpdate";

export const admin_blogs_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/blogs`, element: <AdminBlogsPage /> },

    { path: `/${App_Admin}/blogs/`, element: <AdminBlogsPage /> },
    { path: `/${App_Admin}/blogs-`, element: <AdminBlogsPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/blogs/create`,
        element: <BlogsCreate />,
    },

    {
        path: `/${App_Admin}/blogs/create/`,
        element: <BlogsCreate />,
    },
    {
        path: `/${App_Admin}/blogs/create-`,
        element: <BlogsCreate />,
    },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_Admin}/blogs/:blogId`,
    //     element: <BlogDetails />,
    // },

    // {
    //     path: `/${App_Admin}/blogs/:blogId/`,
    //     element: <BlogDetails />,
    // },
    // {
    //     path: `/${App_Admin}/blogs/:blogId-`,
    //     element: <BlogDetails />,
    // },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/blogs/update/:blogId`,
        element: <BlogUpdate />,
    },

    {
        path: `/${App_Admin}/blogs/update/:blogId/`,
        element: <BlogUpdate />,
    },
    {
        path: `/${App_Admin}/blogs/update/:blogId-`,
        element: <BlogUpdate />,
    },

    // =======================================================================
];
