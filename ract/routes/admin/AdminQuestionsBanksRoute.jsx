// utils
import { App_Admin } from "../../utils/constants";

// component
// questions banks
import AdminQuestionsBanksPage from "../../pages/admin/questionsbanks/AdminQuestionsBanksPage";
import QuestionsBanksCreate from "../../pages/admin/questionsbanks/create/QuestionsBanksCreate";
import QuestionBankDetails from "../../pages/admin/questionsbanks/details/QuestionBankDetails";
import QuestionBankUpdate from "../../pages/admin/questionsbanks/update/QuestionBankUpdate";

// questions
import AdminQuestionsPage from "../../pages/admin/questionsbanks/details/questions/AdminQuestionsPage";
import QuestionsCreate from "../../pages/admin/questionsbanks/details/questions/create/QuestionsCreate";
import QuestionUpdate from "../../pages/admin/questionsbanks/details/questions/update/QuestionUpdate";

export const admin_questions_banks_route = [
    // =====================================================================
    // List
    {
        path: `/${App_Admin}/questions-banks`,
        element: <AdminQuestionsBanksPage />,
    },

    {
        path: `/${App_Admin}/questions-banks/`,
        element: <AdminQuestionsBanksPage />,
    },
    {
        path: `/${App_Admin}/questions-banks-`,
        element: <AdminQuestionsBanksPage />,
    },

    // =====================================================================
    // Create
    {
        path: `/${App_Admin}/questions-banks/create`,
        element: <QuestionsBanksCreate />,
    },

    {
        path: `/${App_Admin}/questions-banks/create/`,
        element: <QuestionsBanksCreate />,
    },
    {
        path: `/${App_Admin}/questions-banks/create-`,
        element: <QuestionsBanksCreate />,
    },

    // =====================================================================
    // Details
    {
        path: `/${App_Admin}/questions-banks/:bankId`,
        element: <QuestionBankDetails />,
    },

    {
        path: `/${App_Admin}/questions-banks/:bankId/`,
        element: <QuestionBankDetails />,
    },
    {
        path: `/${App_Admin}/questions-banks/:bankId-`,
        element: <QuestionBankDetails />,
    },

    // =====================================================================
    // Update
    {
        path: `/${App_Admin}/questions-banks/update/:bankId`,
        element: <QuestionBankUpdate />,
    },

    {
        path: `/${App_Admin}/questions-banks/update/:bankId/`,
        element: <QuestionBankUpdate />,
    },
    {
        path: `/${App_Admin}/questions-banks/update/:bankId-`,
        element: <QuestionBankUpdate />,
    },

    // =====================================================================
    // =====================================================================
    // (Questions) List
    {
        path: `/${App_Admin}/questions-banks/:bankId/questions`,
        element: <AdminQuestionsPage />,
    },

    {
        path: `/${App_Admin}/questions-banks/:bankId/questions/`,
        element: <AdminQuestionsPage />,
    },
    {
        path: `/${App_Admin}/questions-banks/:bankId-questions`,
        element: <AdminQuestionsPage />,
    },

    // =====================================================================
    // (Questions) Create
    {
        path: `/${App_Admin}/questions-banks/:bankId/questions/create`,
        element: <QuestionsCreate />,
    },

    {
        path: `/${App_Admin}/questions-banks/:bankId/questions/create/`,
        element: <QuestionsCreate />,
    },
    {
        path: `/${App_Admin}/questions-banks/:bankId-questions-create`,
        element: <QuestionsCreate />,
    },

    // =====================================================================
    // (Questions) Update
    {
        path: `/${App_Admin}/questions-banks/:bankId/questions/update/:questionId`,
        element: <QuestionUpdate />,
    },

    {
        path: `/${App_Admin}/questions-banks/:bankId/questions/update/:questionId/`,
        element: <QuestionUpdate />,
    },
    {
        path: `/${App_Admin}/questions-banks/:bankId/-questions-update/:questionId`,
        element: <QuestionUpdate />,
    },

    // =====================================================================
    // =====================================================================
];
