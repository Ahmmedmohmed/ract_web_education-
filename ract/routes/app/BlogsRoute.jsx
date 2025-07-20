// pages
import BlogsPage from "../../pages/app/blogspage/BlogsPage";
import BlogDetails from "../../pages/app/blogspage/details/BlogDetails";

export const blogs_route = [
    // ====================================================================
    // List
    {
        path: "/blogs",
        element: <BlogsPage />,
    },

    // =====================================================================
    // Create

    // ====================================================================
    // Details
    {
        path: "/blogs/:blogId",
        element: <BlogDetails />,
    },

    // =====================================================================
    // Update

    // =====================================================================
];
