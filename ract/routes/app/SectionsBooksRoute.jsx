// component
// Sections Blogs
import SectionsBooksPage from "../../pages/app/sectionsbookspage/SectionsBooksPage";
import SectionBookDetails from "../../pages/admin/sectionsbooks/details/SectionBookDetails";

// Blogs
import BooksPage from "../../pages/app/bookspage/BooksPage";
import BookDetails from "../../pages/app/bookspage/details/BookDetails";

export const sections_books_route = [
    // ====================================================================
    // List
    {
        path: "/sectionsbooks",
        element: <SectionsBooksPage />,
    },

    // ====================================================================
    // Details

    // ====================================================================
    // Details
    {
        path: "/sectionsbooks/:sectionId",
        element: <SectionBookDetails />,
    },

    // ====================================================================
    // Details

    // ====================================================================
    // ====================================================================
    // (Books) List
    {
        path: "/books",
        element: <BooksPage />,
    },

    // ====================================================================
    // Details

    // ====================================================================
    // (Books) Details
    {
        path: "/books/:bookId",
        element: <BookDetails />,
    },

    // ====================================================================
    // Details
];
