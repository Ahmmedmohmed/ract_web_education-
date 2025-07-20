// utils
import { App_Admin } from "../../utils/constants";

// component
// Quran Paths
import QuranPathsPage from "../../pages/admin/quranpath/QuranPathsPage";
import QuranPathsCreate from "../../pages/admin/quranpath/create/QuranPathsCreate";
import QuranPathDetails from "../../pages/admin/quranpath/details/QuranPathDetails";
import QuranPathUpdate from "../../pages/admin/quranpath/update/QuranPathUpdate";
import QuranPathDetailsx from "../../pages/admin/quranpath/details/QuranPathDetailsx";

// Students Enrolled Quran Paths
import StudentsEnrolledList from "../../pages/admin/quranpath/details/students/list/StudentsEnrolledList";

// Class Rooms
import ClassRoomsCreate from "../../pages/admin/classrooms/create/ClassRoomsCreate";
import ClassRoomUpdate from "../../pages/admin/classrooms/update/ClassRoomUpdate";

// Review Level
import ReviewLevelsCreate from "../../pages/admin/reviewlevel/create/ReviewLevelsCreate";
import ReviewLevelUpdate from "../../pages/admin/reviewlevel/update/ReviewLevelUpdate";

// Chapter In Qurans
import ChapterInQuransCreate from "../../pages/admin/chapterinqurans/create/ChapterInQuransCreate";
import ChapterInQuranDetails from "../../pages/admin/chapterinqurans/details/ChapterInQuranDetails";
import ChapterInQuranUpdate from "../../pages/admin/chapterinqurans/update/ChapterInQuranUpdate";

// Quran Circle
import QuranCirclesCreate from "../../pages/admin/qurancircle/create/QuranCirclesCreate";
import QuranCircleUpdate from "../../pages/admin/qurancircle/update/QuranCircleUpdate";

// Live Quran Circles
import LiveQuranCirclesCreate from "../../pages/admin/livequrancircle/create/LiveQuranCirclesCreate";
import LiveQuranCircleUpdate from "../../pages/admin/livequrancircle/update/LiveQuranCircleUpdate";

// Quran Exams
import QuranExamsCreate from "../../pages/admin/quranexam/create/QuranExamsCreate";
import QuranExamUpdate from "../../pages/admin/quranexam/update/QuranExamUpdate";

// Presence And Absences
import PresenceAndAbsencesCreate from "../../pages/admin/presenceandabsence/create/PresenceAndAbsencesCreate";
import PresenceAndAbsenceUpdate from "../../pages/admin/presenceandabsence/update/PresenceAndAbsenceUpdate";

// File And Librarys
import FileAndLibrarysCreate from "../../pages/admin/fileandlibrary/create/FileAndLibrarysCreate";
import FileAndLibraryUpdate from "../../pages/admin/fileandlibrary/update/FileAndLibraryUpdate";

// Teacher Notes
import TeacherNotesCreate from "../../pages/admin/teachernote/create/TeacherNotesCreate";
import TeacherNoteUpdate from "../../pages/admin/teachernote/update/TeacherNoteUpdate";

// Certificate Qurans
import CertificateQuransCreate from "../../pages/admin/certificatequran/create/CertificateQuransCreate";
import CertificateQuranUpdate from "../../pages/admin/certificatequran/update/CertificateQuranUpdate";

// Students
import StudentsEnrolledCreate from "../../pages/admin/chapterinqurans/details/students/create/StudentsEnrolledCreate";

export const admin_quran_paths_route = [
    // =======================================================================
    // List
    { path: `/${App_Admin}/quranpaths`, element: <QuranPathsPage /> },

    { path: `/${App_Admin}/quranpaths/`, element: <QuranPathsPage /> },
    { path: `/${App_Admin}/quranpaths-`, element: <QuranPathsPage /> },
    
    // =======================================================================
    // Create
    {
        path: `/${App_Admin}/quranpaths/create`,
        element: <QuranPathsCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/create/`,
        element: <QuranPathsCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/create-`,
        element: <QuranPathsCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/quranpaths/:quranpathId`,
        element: <QuranPathDetails />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/`,
        element: <QuranPathDetails />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId-`,
        element: <QuranPathDetails />,
    },
    
    {
        path: `/${App_Admin}/quranpathsx/:quranpathId`,
        element: <QuranPathDetailsx />,
    },
    
    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/update/:quranpathId`,
        element: <QuranPathUpdate />,
    },
    
    {
        path: `/${App_Admin}/quranpaths/update/:quranpathId/`,
        element: <QuranPathUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/update/:quranpathId-`,
        element: <QuranPathUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Students Enrolled  *** //
    // List
    { path: `/${App_Admin}/quranpaths/:quranpathId/students`, element: <StudentsEnrolledList /> },

    { path: `/${App_Admin}/quranpaths/:quranpathId/students/`, element: <StudentsEnrolledList /> },
    { path: `/${App_Admin}/quranpaths/:quranpathId/students-`, element: <StudentsEnrolledList /> },
    

    // =======================================================================
    // =======================================================================
    // ***  Class Rooms *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/classrooms/create`,
        element: <ClassRoomsCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/classrooms/create/`,
        element: <ClassRoomsCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/classrooms/create-`,
        element: <ClassRoomsCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/classrooms/update/:classroomId`,
        element: <ClassRoomUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/classrooms/update/:classroomId/`,
        element: <ClassRoomUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/classrooms/update/:classroomId-`,
        element: <ClassRoomUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Class Rooms *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/reviewlevels/create`,
        element: <ReviewLevelsCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/reviewlevels/create/`,
        element: <ReviewLevelsCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/reviewlevels/create-`,
        element: <ReviewLevelsCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/reviewlevels/update/:reviewlevelId`,
        element: <ReviewLevelUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/reviewlevels/update/:reviewlevelId/`,
        element: <ReviewLevelUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/reviewlevels/update/:reviewlevelId-`,
        element: <ReviewLevelUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Chapter In Qurans *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/create`,
        element: <ChapterInQuransCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/create/`,
        element: <ChapterInQuransCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/create-`,
        element: <ChapterInQuransCreate />,
    },

    // =======================================================================
    // Details
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId`,
        element: <ChapterInQuranDetails />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/`,
        element: <ChapterInQuranDetails />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId-`,
        element: <ChapterInQuranDetails />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/update/:chapterinquranId`,
        element: <ChapterInQuranUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/update/:chapterinquranId/`,
        element: <ChapterInQuranUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/update/:chapterinquranId-`,
        element: <ChapterInQuranUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Quran Circle  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/qurancircles/create`,
        element: <QuranCirclesCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/qurancircles/create/`,
        element: <QuranCirclesCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/qurancircles/create-`,
        element: <QuranCirclesCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/qurancircles/update/:qurancircleId`,
        element: <QuranCircleUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/qurancircles/update/:qurancircleId/`,
        element: <QuranCircleUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/qurancircles/update/:qurancircleId-`,
        element: <QuranCircleUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Live Quran Circle  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/livequrancircles/create`,
        element: <LiveQuranCirclesCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/livequrancircles/create/`,
        element: <LiveQuranCirclesCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/livequrancircles/create-`,
        element: <LiveQuranCirclesCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/livequrancircles/update/:livequrancircleId`,
        element: <LiveQuranCircleUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/livequrancircles/update/:livequrancircleId/`,
        element: <LiveQuranCircleUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/livequrancircles/update/:livequrancircleId-`,
        element: <LiveQuranCircleUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Quran Exam  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/quranexams/create`,
        element: <QuranExamsCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/quranexams/create/`,
        element: <QuranExamsCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/quranexams/create-`,
        element: <QuranExamsCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/quranexams/update/:quranexamId`,
        element: <QuranExamUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/quranexams/update/:quranexamId/`,
        element: <QuranExamUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/quranexams/update/:quranexamId-`,
        element: <QuranExamUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Presence And Absence  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/presenceandabsences/create`,
        element: <PresenceAndAbsencesCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/presenceandabsences/create/`,
        element: <PresenceAndAbsencesCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/presenceandabsences/create-`,
        element: <PresenceAndAbsencesCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/presenceandabsences/update/:presenceandabsenceId`,
        element: <PresenceAndAbsenceUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/presenceandabsences/update/:presenceandabsenceId/`,
        element: <PresenceAndAbsenceUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/presenceandabsences/update/:presenceandabsenceId-`,
        element: <PresenceAndAbsenceUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  File And Library  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/fileandlibrary/create`,
        element: <FileAndLibrarysCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/fileandlibrary/create/`,
        element: <FileAndLibrarysCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/fileandlibrary/create-`,
        element: <FileAndLibrarysCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/fileandlibrarys/update/:fileandlibraryId`,
        element: <FileAndLibraryUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/fileandlibrarys/update/:fileandlibraryId/`,
        element: <FileAndLibraryUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/fileandlibrarys/update/:fileandlibraryId-`,
        element: <FileAndLibraryUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Teacher Notes  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/teachernotes/create`,
        element: <TeacherNotesCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/teachernotes/create/`,
        element: <TeacherNotesCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/teachernotes/create-`,
        element: <TeacherNotesCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/teachernotes/update/:teachernoteId`,
        element: <TeacherNoteUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/teachernotes/update/:teachernoteId/`,
        element: <TeacherNoteUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/teachernotes/update/:teachernoteId-`,
        element: <TeacherNoteUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Certificate Qurans  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/certificatequrans/create`,
        element: <CertificateQuransCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/certificatequrans/create/`,
        element: <CertificateQuransCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/certificatequrans/create-`,
        element: <CertificateQuransCreate />,
    },

    // =======================================================================
    // Update
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/certificatequrans/update/:certificatequranId`,
        element: <CertificateQuranUpdate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/certificatequrans/update/:certificatequranId/`,
        element: <CertificateQuranUpdate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/:studentId/certificatequrans/update/:certificatequranId-`,
        element: <CertificateQuranUpdate />,
    },

    // =======================================================================
    // =======================================================================
    // ***  Certificate Qurans  *** //
    // Create
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/create`,
        element: <StudentsEnrolledCreate />,
    },

    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/create/`,
        element: <StudentsEnrolledCreate />,
    },
    {
        path: `/${App_Admin}/quranpaths/:quranpathId/chapterinqurans/:chapterinquranId/students/create-`,
        element: <StudentsEnrolledCreate />,
    },

    // =======================================================================
    // Update
  
    // =======================================================================
];
