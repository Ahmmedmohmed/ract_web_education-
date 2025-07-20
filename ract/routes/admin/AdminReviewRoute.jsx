// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminReviewsPage from "../../pages/admin/reviews/AdminReviewsPage";

export const admin_review_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/review`, element: <AdminReviewsPage /> },

    { path: `/${App_Admin}/review/`, element: <AdminReviewsPage /> },
    { path: `/${App_Admin}/review-`, element: <AdminReviewsPage /> },

    // =====================================================================
    // Create

    // =====================================================================
    // Details

    // =====================================================================
    // Update

    // =====================================================================
];
