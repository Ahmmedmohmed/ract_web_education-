// utils
import { App_Admin } from "../../utils/constants";

// component
import AdminInterviewDatesPage from "../../pages/admin/interviewdates/AdminInterviewDatesPage";
import InterviewDatesCreate from "../../pages/admin/interviewdates/create/InterviewDatesCreate";
import InterviewDateDetails from "../../pages/admin/interviewdates/details/InterviewDateDetails";
import InterviewDateUpdate from "../../pages/admin/interviewdates/update/InterviewDateUpdate";

export const admin_interview_dates_route = [
    // =======================================================================
    // List
    {
        path: `/${App_Admin}/interviewdates`,
        element: <AdminInterviewDatesPage />,
    },

    {
        path: `/${App_Admin}/interviewdates/`,
        element: <AdminInterviewDatesPage />,
    },
    {
        path: `/${App_Admin}/interviewdates-`,
        element: <AdminInterviewDatesPage />,
    },

    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/interviewdates/create`,
        element: <InterviewDatesCreate />,
    },

    {
        path: `/${App_Admin}/interviewdates/create/`,
        element: <InterviewDatesCreate />,
    },
    {
        path: `/${App_Admin}/interviewdates/create-`,
        element: <InterviewDatesCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/interviewdates/:interviewdateId`,
        element: <InterviewDateDetails />,
    },

    {
        path: `/${App_Admin}/interviewdates/:interviewdateId/`,
        element: <InterviewDateDetails />,
    },
    {
        path: `/${App_Admin}/interviewdates/:interviewdateId-`,
        element: <InterviewDateDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/interviewdates/update/:interviewdateId`,
        element: <InterviewDateUpdate />,
    },

    {
        path: `/${App_Admin}/interviewdates/update/:interviewdateId/`,
        element: <InterviewDateUpdate />,
    },
    {
        path: `/${App_Admin}/interviewdates/update/:interviewdateId-`,
        element: <InterviewDateUpdate />,
    },

    // =======================================================================
];
