// utils
import { App_User } from "../../utils/constants";

// component  
import UserPackagesPage from "../../pages/user/packages/UserPackagesPage";
import PackagesCreate from "../../pages/user/packages/create/PackagesCreate";
import PackageDetails from "../../pages/user/packages/details/PackageDetails";
import PackageUpdate from "../../pages/user/packages/update/PackageUpdate";

export const user_packages_route = [
    // =======================================================================
    // List
    { path: `/${App_User}/packages`, element: <UserPackagesPage /> },

    { path: `/${App_User}/packages/`, element: <UserPackagesPage /> },
    { path: `/${App_User}/packages-`, element: <UserPackagesPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_User}/packages/create`,
        element: <PackagesCreate />,
    },

    {
        path: `/${App_User}/packages/create/`,
        element: <PackagesCreate />,
    },
    {
        path: `/${App_User}/packages/create-`,
        element: <PackagesCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_User}/packages/:packageId`,
        element: <PackageDetails />,
    },

    {
        path: `/${App_User}/packages/:packageId/`,
        element: <PackageDetails />,
    },
    {
        path: `/${App_User}/packages/:packageId-`,
        element: <PackageDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_User}/packages/update/:packageId`,
        element: <PackageUpdate />,
    },

    {
        path: `/${App_User}/packages/update/:packageId/`,
        element: <PackageUpdate />,
    },
    {
        path: `/${App_User}/packages/update/:packageId-`,
        element: <PackageUpdate />,
    },

    // =======================================================================
];
