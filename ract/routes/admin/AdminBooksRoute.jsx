// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminBooksPage from "../../pages/admin/books/AdminBooksPage";
import BooksCreate from "../../pages/admin/books/create/BooksCreate";
import BookUpdate from "../../pages/admin/books/update/BookUpdate";

export const admin_books_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/books`, element: <AdminBooksPage /> },

    { path: `/${App_Admin}/books/`, element: <AdminBooksPage /> },
    { path: `/${App_Admin}/books-`, element: <AdminBooksPage /> },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/books/create`,
        element: <BooksCreate />,
    },

    {
        path: `/${App_Admin}/books/create/`,
        element: <BooksCreate />,
    },
    {
        path: `/${App_Admin}/books/create-`,
        element: <BooksCreate />,
    },

    // =======================================================================
    // Details
    // {
    //     path: `/${App_Admin}/books/:bookId`,
    //     element: <BookDetails />,
    // },

    // {
    //     path: `/${App_Admin}/books/:bookId/`,
    //     element: <BookDetails />,
    // },
    // {
    //     path: `/${App_Admin}/books/:bookId-`,
    //     element: <BookDetails />,
    // },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/books/update/:bookId`,
        element: <BookUpdate />,
    },

    {
        path: `/${App_Admin}/books/update/:bookId/`,
        element: <BookUpdate />,
    },
    {
        path: `/${App_Admin}/books/update/:bookId-`,
        element: <BookUpdate />,
    },

    // =======================================================================
];
