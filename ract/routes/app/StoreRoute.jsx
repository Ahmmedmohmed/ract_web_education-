// component
import StoreDetails from "../../pages/app/storepage/details/StoreDetails";
import StorePage from "../../pages/app/storepage/StorePage";

export const store_route = [
    // ====================================================================
    // List
    { path: "/store", element: <StorePage /> },

    { path: "/store-", element: <StorePage /> },
    { path: "/store/", element: <StorePage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    { path: "/store/:storeId", element: <StoreDetails /> },

    { path: "/store/:storeId-", element: <StoreDetails /> },
    { path: "/store/:storeId/", element: <StoreDetails /> },

    // ====================================================================
    // Update

    // ====================================================================
];
