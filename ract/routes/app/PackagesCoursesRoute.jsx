// components
import PackagesCoursesPage from "../../pages/app/packagespage/PackagesCoursesPage";
import PackageCoursesDetails from "../../pages/app/packagespage/details/PackageCoursesDetails";

export const packages_courses_route = [
    // ====================================================================
    // List
    {
        path: "/packages",
        element: <PackagesCoursesPage />,
    },
   
    {
        path: "/packages/",
        element: <PackagesCoursesPage />,
    },
    {
        path: "/packages-",
        element: <PackagesCoursesPage />,
    },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    {
        path: "/packages/:packageId",
        element: <PackageCoursesDetails />,
    },
  
    {
        path: "/packages/:packageId/",
        element: <PackageCoursesDetails />,
    },
    {
        path: "/packages/:packageId-",
        element: <PackageCoursesDetails />,
    },

    // ====================================================================
    // Update

    // ====================================================================
];
