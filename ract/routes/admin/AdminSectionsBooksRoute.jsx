// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminSectionsBooksPage from "../../pages/admin/sectionsbooks/AdminSectionsBooksPage";
import SectionsBooksCreate from "../../pages/admin/sectionsbooks/create/SectionsBooksCreate";
import SectionBookDetails from "../../pages/admin/sectionsbooks/details/SectionBookDetails";
import SectionBookUpdate from "../../pages/admin/sectionsbooks/update/SectionBookUpdate";

export const admin_sections_books_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/sectionsbooks`, element: <AdminSectionsBooksPage /> },

    { path: `/${App_Admin}/sectionsbooks/`, element: <AdminSectionsBooksPage /> },
    { path: `/${App_Admin}/sectionsbooks-`, element: <AdminSectionsBooksPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/sectionsbooks/create`,
        element: <SectionsBooksCreate />,
    },

    {
        path: `/${App_Admin}/sectionsbooks/create/`,
        element: <SectionsBooksCreate />,
    },
    {
        path: `/${App_Admin}/sectionsbooks/create-`,
        element: <SectionsBooksCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/sectionsbooks/:sectionId`,
        element: <SectionBookDetails />,
    },

    {
        path: `/${App_Admin}/sectionsbooks/:sectionId/`,
        element: <SectionBookDetails />,
    },
    {
        path: `/${App_Admin}/sectionsbooks/:sectionId-`,
        element: <SectionBookDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/sectionsbooks/update/:sectionId`,
        element: <SectionBookUpdate />,
    },

    {
        path: `/${App_Admin}/sectionsbooks/update/:sectionId/`,
        element: <SectionBookUpdate />,
    },
    {
        path: `/${App_Admin}/sectionsbooks/update/:sectionId-`,
        element: <SectionBookUpdate />,
    },

    // =======================================================================
];
