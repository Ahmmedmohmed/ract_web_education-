// utils
import { App_User } from "../../utils/constants";

// component
import UserReviewPage from "../../pages/user/review/UserReviewPage";
import ReviewCreate from "../../pages/user/review/create/ReviewCreate";
import ReviewUpdate from "../../pages/user/review/update/ReviewUpdate";

export const user_review_route = [
    // ====================================================================
    // List
    { path: `/${App_User}/review`, element: <UserReviewPage /> },

    { path: `/${App_User}/review/`, element: <UserReviewPage /> },
    { path: `/${App_User}/review-`, element: <UserReviewPage /> },

    // ====================================================================
    // Create
    { path: `/${App_User}/review/create`, element: <ReviewCreate /> },

    { path: `/${App_User}/review/create/`, element: <ReviewCreate /> },
    { path: `/${App_User}/review/create-`, element: <ReviewCreate /> },

    // ====================================================================
    // Details

    // ====================================================================
    // Update
    { path: `/${App_User}/review/update/:reviewId`, element: <ReviewUpdate /> },

    {
        path: `/${App_User}/review/update/:reviewId/`,
        element: <ReviewUpdate />,
    },
    {
        path: `/${App_User}/review/update/:reviewId-`,
        element: <ReviewUpdate />,
    },

    // ====================================================================
];
