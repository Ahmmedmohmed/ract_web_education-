// component
import QuestionsBanksPage from "../../pages/app/questionbankspage/QuestionsBanksPage";
import QuestionBankDetails from "../../pages/app/questionbankspage/details/QuestionBankDetails";
import QuestionBankTake from "../../pages/app/questionbankspage/take/QuestionBankTake";
import QuestionBankResults from "../../pages/app/questionbankspage/results/QuestionBankResults";

export const questions_banks_route = [
    // ====================================================================
    // List
    { path: `/questions-banks`, element: <QuestionsBanksPage /> },

    { path: `/questions-banks/`, element: <QuestionsBanksPage /> },
    { path: `/questions-banks-`, element: <QuestionsBanksPage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    {
        path: `/questions-banks/:bankId`,
        element: <QuestionBankDetails />,
    },

    {
        path: `/questions-banks/:bankId/`,
        element: <QuestionBankDetails />,
    },
    {
        path: `/questions-banks-/:bankId`,
        element: <QuestionBankDetails />,
    },

    // ====================================================================
    // Update

    // ====================================================================
    // (Questions) Take
    {
        path: `/questions-banks/:bankId/take`,
        element: <QuestionBankTake />,
    },

    // ====================================================================
    // (Questions) Results
    {
        path: `/questions-banks/:bankId/results`,
        element: <QuestionBankResults />,
    },

    // ====================================================================
];
