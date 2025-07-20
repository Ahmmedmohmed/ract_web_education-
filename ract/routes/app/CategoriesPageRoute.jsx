// component
import CategoriesPage from "../../pages/app/categoriespage/CategoriesPage";
import CategoryDetails from "../../pages/app/categoriespage/details/CategoryDetails";

export const categories_page_route = [
    // ====================================================================
    // List
    { path: "/categories", element: <CategoriesPage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    { path: "/categories/:categoryId", element: <CategoryDetails /> },

    // ====================================================================
    // Update

    // ====================================================================
];
