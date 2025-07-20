// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminPackagesPage from "../../pages/admin/packages/AdminPackagesPage";
import PackagesCreate from "../../pages/admin/packages/create/PackagesCreate";
import PackageDetails from "../../pages/admin/packages/details/PackageDetails";
import PackageUpdate from "../../pages/admin/packages/update/PackageUpdate";
import PackagesDiscount from "../../pages/admin/packages/discount/PackagesDiscount";

export const admin_packages_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/packages`, element: <AdminPackagesPage /> },

    { path: `/${App_Admin}/packages/`, element: <AdminPackagesPage /> },
    { path: `/${App_Admin}/packages-`, element: <AdminPackagesPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/packages/create`,
        element: <PackagesCreate />,
    },

    {
        path: `/${App_Admin}/packages/create/`,
        element: <PackagesCreate />,
    },
    {
        path: `/${App_Admin}/packages/create-`,
        element: <PackagesCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/packages/:packageId`,
        element: <PackageDetails />,
    },

    {
        path: `/${App_Admin}/packages/:packageId/`,
        element: <PackageDetails />,
    },
    {
        path: `/${App_Admin}/packages/:packageId-`,
        element: <PackageDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/packages/update/:packageId`,
        element: <PackageUpdate />,
    },

    {
        path: `/${App_Admin}/packages/update/:packageId/`,
        element: <PackageUpdate />,
    },
    {
        path: `/${App_Admin}/packages/update/:packageId-`,
        element: <PackageUpdate />,
    },

    // =======================================================================
    // Discount
    {
        path: `/${App_Admin}/packages/discount`,
        element: <PackagesDiscount />,
    },

    {
        path: `/${App_Admin}/packages/discount/`,
        element: <PackagesDiscount />,
    },
    {
        path: `/${App_Admin}/packages/discount-`,
        element: <PackagesDiscount />,
    },

    // =======================================================================
];
