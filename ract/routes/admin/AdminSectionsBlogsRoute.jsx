// utils
import { App_Admin } from "../../utils/constants";

// component 
import AdminSectionsBlogsPage from "../../pages/admin/sectionsblogs/AdminSectionsBlogsPage";
import SectionsBlogsCreate from "../../pages/admin/sectionsblogs/create/SectionsBlogsCreate";
import SectionBlogDetails from "../../pages/admin/sectionsblogs/details/SectionBlogDetails";
import SectionBlogUpdate from "../../pages/admin/sectionsblogs/update/SectionBlogUpdate";

export const admin_sections_blogs_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/sectionsblogs`, element: <AdminSectionsBlogsPage /> },

    { path: `/${App_Admin}/sectionsblogs/`, element: <AdminSectionsBlogsPage /> },
    { path: `/${App_Admin}/sectionsblogs-`, element: <AdminSectionsBlogsPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/sectionsblogs/create`,
        element: <SectionsBlogsCreate />,
    },

    {
        path: `/${App_Admin}/sectionsblogs/create/`,
        element: <SectionsBlogsCreate />,
    },
    {
        path: `/${App_Admin}/sectionsblogs/create-`,
        element: <SectionsBlogsCreate />,
    },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_Admin}/sectionsblogs/:sectionId`,
    //     element: <SectionBlogDetails />,
    // },

    // {
    //     path: `/${App_Admin}/sectionsblogs/:sectionId/`,
    //     element: <SectionBlogDetails />,
    // },
    // {
    //     path: `/${App_Admin}/sectionsblogs/:sectionId-`,
    //     element: <SectionBlogDetails />,
    // },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/sectionsblogs/update/:sectionId`,
        element: <SectionBlogUpdate />,
    },

    {
        path: `/${App_Admin}/sectionsblogs/update/:sectionId/`,
        element: <SectionBlogUpdate />,
    },
    {
        path: `/${App_Admin}/sectionsblogs/update/:sectionId-`,
        element: <SectionBlogUpdate />,
    },

    // =======================================================================
];
