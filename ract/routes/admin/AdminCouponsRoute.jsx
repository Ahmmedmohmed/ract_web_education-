// utils
import { App_Admin } from "../../utils/constants";

// component
import AddminCouponsPage from "../../pages/admin/coupons/AddminCouponsPage";
import CouponsCreate from "../../pages/admin/coupons/create/CouponsCreate";
import CouponUpdate from "../../pages/admin/coupons/update/CouponUpdate";

export const admin_coupons_route = [
    // =====================================================================
    // List
    { path: `/${App_Admin}/coupons`, element: <AddminCouponsPage /> },

    { path: `/${App_Admin}/coupons/`, element: <AddminCouponsPage /> },
    { path: `/${App_Admin}/coupons-`, element: <AddminCouponsPage /> },

    // =====================================================================
    // Create
    { path: `/${App_Admin}/coupons/create`, element: <CouponsCreate /> },

    { path: `/${App_Admin}/coupons/create/`, element: <CouponsCreate /> },
    { path: `/${App_Admin}/coupons/create-`, element: <CouponsCreate /> },

    // =====================================================================
    // Details
    // {
    //     path: `/${App_Admin}/coupons/:couponId`,
    //     element: < />,
    // },

    // {
    //     path: `/${App_Admin}/coupons/:couponId/`,
    //     element: < />,
    // },
    // {
    //     path: `/${App_Admin}/coupons/:couponId-`,
    //     element: < />,
    // },

    // =====================================================================
    // Update
    {
        path: `/${App_Admin}/coupons/update/:couponId`,
        element: <CouponUpdate />,
    },

    {
        path: `/${App_Admin}/coupons/update/:couponId/`,
        element: <CouponUpdate />,
    },
    {
        path: `/${App_Admin}/coupons/update/:couponId-`,
        element: <CouponUpdate />,
    },

    // =====================================================================
];
