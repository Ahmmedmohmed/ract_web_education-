// component
import SectionsCoursePage from "../../pages/app/sectionscoursepage/SectionsCoursePage";
import SectionCourseDetails from "../../pages/app/sectionscoursepage/details/SectionCourseDetails";

export const section_course_page_route = [
    // ====================================================================
    // List
    { path: "/sectionscourse", element: <SectionsCoursePage /> },

    // ====================================================================
    // Create

    // ====================================================================
    // Details
    {
        path: "/sectionscourse/:sectioncourseId",
        element: <SectionCourseDetails />,
    },

    // ====================================================================
    // Update

    // ====================================================================
];
