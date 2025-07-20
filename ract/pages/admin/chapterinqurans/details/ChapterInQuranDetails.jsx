/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowRight,
    BarChart,
    BookOpen,
    BookText,
    CalendarDays,
    Clock,
    Download,
    Edit,
    Landmark,
    LinkIcon,
    Loader2,
    Plus,
    Tag,
    Trash,
    Users,
    UserSquare,
} from "lucide-react";
import moment from "moment";

// api
import {
    publicGetChapterInQuranById,
    publicGetEnrollmentStuentChapterInQuranById,
} from "../../../../api/public/authPublic";

// data
import {
    examType,
    getAttendanceClass,
    getRatingClass,
    getRatingFromGrade,
    sessionType,
} from "../../../../data/quranschoolDate";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, SERVER_URL } from "../../../../utils/constants";
import {
    formatDateDay,
    formatDateTimeLiveQuran,
} from "../../../../utils/helpers";

// components
import ChapterInQuranCard from "./card/ChapterInQuranCard";
import QuranCirclesList from "./qurancircle/QuranCirclesList";
import LiveQuranCirclesList from "./livequrancircle/LiveQuranCirclesList";
import QuranExamsList from "./quranexam/QuranExamsList";
import PresenceAndAbsenceList from "./presenceandabsence/PresenceAndAbsenceList";
import FileAndLibrarysList from "./fileandlibrary/FileAndLibrarysList";
import StudentEnrollments from "./studentenrollment/StudentEnrollments";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function ChapterInQuranDetails() {
    const { quranpathId, chapterinquranId } = useParams();
    const navigate = useNavigate();

    const [chapterInQuran, setChapterInQuran] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //
    const [enrollmentStuents, setEnrollmentStuents] = useState([]);

    useEffect(() => {
        const fetchQuranPath = async () => {
            try {
                const { data, error } = await publicGetChapterInQuranById(
                    chapterinquranId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
                    setIsLoading(false);
                } else {
                    setChapterInQuran(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching section:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_Admin}/quranpaths`);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuranPath();
    }, [quranpathId, navigate, chapterinquranId]);

    useEffect(() => {
        const fetchtEnrollmentStuentChapterInQuran = async () => {
            try {
                const { data, error } =
                    await publicGetEnrollmentStuentChapterInQuranById(
                        chapterinquranId
                    );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
                    setIsLoading(false);
                } else {
                    setEnrollmentStuents(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching section:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchtEnrollmentStuentChapterInQuran();
    }, [quranpathId, navigate, chapterinquranId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`setChapterInQuran`, chapterInQuran);
    // console.log(`enrollmentStuent`, enrollmentStuents);
    // console.log(
    //     `enrollmentStuents[selectedStudentId]?.full_name`,
    //     selectedStudentId
    // );
    // console.log(
    //     `enrollmentStuents[selectedStudentId]?.full_name`,
    //     enrollmentStuents[selectedStudentId]
    // );
    // console.log(`selectedStudent`, selectedStudent);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-between items-center gap-2 mb-8">
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/${App_Admin}/quranpaths/${quranpathId}`
                                    )
                                }
                                className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold text-gray-800">
                                {chapterInQuran?.title}
                            </h1>
                        </div>

                        <Link
                            to={`/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/create`}
                            className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all`}
                        >
                            <Plus size={18} className="ml-1" />
                            إضافة طالب للفصل
                        </Link>
                    </div>

                    {/*  */}
                    <div className="flex flex-col gap-8">
                        {/*  */}
                        <ChapterInQuranCard chapterInQuran={chapterInQuran} />

                        {/* user */}
                        <StudentEnrollments
                            enrollmentStuents={enrollmentStuents}
                            setEnrollmentStuents={setEnrollmentStuents}
                            quranpathId={quranpathId}
                            chapterinquranId={chapterinquranId}
                        />

                        {/* qurancircles */}
                        <QuranCirclesList
                            quranpathId={quranpathId}
                            chapterinquranId={chapterinquranId}
                            chapterInQuran={chapterInQuran}
                        />

                        {/* livequrancircles */}
                        <LiveQuranCirclesList
                            quranpathId={quranpathId}
                            chapterinquranId={chapterinquranId}
                            chapterInQuran={chapterInQuran}
                        />

                        {/* quran exam */}
                        <QuranExamsList
                            quranpathId={quranpathId}
                            chapterinquranId={chapterinquranId}
                            chapterInQuran={chapterInQuran}
                        />

                        {/* Presence And Absence */}
                        <PresenceAndAbsenceList
                            quranpathId={quranpathId}
                            chapterinquranId={chapterinquranId}
                            chapterInQuran={chapterInQuran}
                        />

                        {/*  File And Library */}
                        <FileAndLibrarysList
                            quranpathId={quranpathId}
                            chapterinquranId={chapterinquranId}
                            chapterInQuran={chapterInQuran}
                        />

                        {/*  */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChapterInQuranDetails;
