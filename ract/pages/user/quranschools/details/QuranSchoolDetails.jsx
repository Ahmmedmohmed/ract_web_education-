/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Clock,
    Users,
    BookOpen,
    Download,
    File,
    ArrowRight,
    Send,
    Frown,
    Target,
    GraduationCap,
    SquareStack,
    Calendar,
} from "lucide-react";

// api
import { userGetStudentEnrolledQuranSchoolById } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// data

// utils
import {
    App_User,
    nameMainColor,
    phonenumber,
} from "../../../../utils/constants";
import { formatDateDay } from "../../../../utils/helpers";

// components
import FileAndLibrarys from "./fileandlibrarys/FileAndLibrarys";
import CertificateQuran from "./certificatequran/CertificateQuran";
import DegreeQuranExam from "./degreequranexam/DegreeQuranExam";
import DegreePresenceAndAbsence from "./degreepresenceandabsence/DegreePresenceAndAbsence";
import DegreeQuranCircle from "./degreequrancircle/DegreeQuranCircle";
import TeacherNote from "./teachernote/TeacherNote";
import LiveQuranCircles from "./livequrancircles/LiveQuranCircles";

// component

// assets

// --- COMPONENTS ---

const InfoCard = ({ icon, label, value }) => {
    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <div className="flex items-center gap-5 p-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                        {icon}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className="text-lg font-bold text-emerald-900">
                            {value}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

const CurriculumCard = ({ chapterInQuran }) => {
    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <div className="flex items-center gap-5 p-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                        {/* <i className="fas fa-book-reader text-xl"></i> */}
                        <BookOpen />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                            المنهج المقرر
                        </span>

                        <div className="mt-1">
                            <p className="flex items-center gap-2 text-gray-800 leading-relaxed">
                                <strong className=" text-emerald-800">
                                    منهج القرآن:
                                </strong>
                                <span>{chapterInQuran?.approach_quran}</span>
                            </p>

                            <p className="flex items-center gap-2 text-gray-800 leading-relaxed">
                                <strong className="text-emerald-800">
                                    علوم القرآن:
                                </strong>
                                <span>{chapterInQuran?.quran_sciences}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ScheduleCard = ({ schedule }) => {
    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <div className="flex items-center gap-5 p-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                        {/* <i className="fas fa-calendar-alt text-xl"></i> */}
                        <Calendar />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                            مواعيد الحلقات والمحاضرات
                        </span>

                        <div className="mt-1">
                            <p className=" flex items-center gap-2 text-gray-800 leading-relaxed">
                                <strong className="text-emerald-800">
                                    حلقات القرآن:
                                </strong>{" "}
                                <span>{schedule?.date_quran_sessions}</span>
                            </p>

                            <p className=" flex items-center gap-2 text-gray-800 leading-relaxed">
                                <strong className="text-emerald-800">
                                    علوم القرآن:
                                </strong>{" "}
                                <span>
                                    {
                                        schedule?.quranic_sciences_lecture_schedule
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function QuranSchoolDetails() {
    const { quranschoolId } = useParams();
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();
    // console.log(`userData`, userData);

    const [quranSchool, setQuranSchool] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEnrolledQuranSchool = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await userGetStudentEnrolledQuranSchoolById(quranschoolId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/${App_User}/quranschools`);
                } else {
                    // Set form values
                    setQuranSchool(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/${App_User}/quranschools`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnrolledQuranSchool();
    }, [quranschoolId, navigate]);

    // //
    // const handleDownloadFile = (file) => {
    //     const link = document.createElement("a");
    //     link.href = file.content;
    //     link.download = file.name;
    //     link.click();
    // };

    console.log(`quranSchool`, quranSchool);

    return (
        <>
            <div>
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                        <div className="flex items-center justify-center   ">
                            <button
                                onClick={() => {
                                    navigate(`/${App_User}/courses`);
                                    // moveBack();
                                }}
                                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold mr-2 text-black ">
                                {/* {course?.title} */}
                                {quranSchool?.chapter_in_qurans?.title}
                            </h1>
                        </div>
                    </div>

                    <div
                        // dir="rtl"
                        className="min-h-screen bg-gray-50 p-5 md:p-10 font-sans"
                    >
                        {/* Link to Font Awesome for icons */}
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                        />

                        {/* Dashboard Header */}
                        <header className="mb-8 pb-5 border-b border-gray-200">
                            <h1 className="flex items-center gap-4 text-3xl font-bold text-emerald-900">
                                <span>اسْمُ الطَّالِبِ:</span>
                                <span>{quranSchool?.full_name}</span>
                            </h1>
                        </header>

                        {/* Main Dashboard Content */}
                        <div className="space-y-6 flex flex-col gap-8">
                            {/* Top Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <InfoCard
                                    icon={
                                        // <i className="fas fa-bullseye text-xl"></i>
                                        <Target />
                                    }
                                    label="نَوْعُ المَسَارِ"
                                    value={quranSchool?.quran_paths?.title}
                                />

                                {quranSchool?.classroom ? (
                                    <InfoCard
                                        icon={
                                            // <i className="fas fa-graduation-cap text-xl"></i>
                                            <GraduationCap />
                                        }
                                        label="السَّنَةُ الدِّرَاسِيَّةُ"
                                        value={quranSchool?.classrooms?.title}
                                    />
                                ) : (
                                    <></>
                                )}

                                {quranSchool?.review_level ? (
                                    <InfoCard
                                        icon={
                                            // <i className="fas fa-graduation-cap text-xl"></i>
                                            <SquareStack />
                                        }
                                        label="المتسوي الدِّرَاسِيَّ"
                                        value={quranSchool?.review_levels?.title}
                                    />
                                ) : (
                                    <></>
                                )}

                                <InfoCard
                                    icon={
                                        // <i className="fas fa-users text-xl"></i>
                                        <Users />
                                    }
                                    label="اسْمُ الفَصْلِ"
                                    value={quranSchool?.chapter_in_qurans?.title}
                                />
                            </div>

                            {/* Curriculum and Schedule Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <CurriculumCard
                                    chapterInQuran={
                                        quranSchool?.chapter_in_qurans
                                    }
                                />
                                <ScheduleCard
                                    schedule={quranSchool?.chapter_in_qurans}
                                />
                            </div>

                            <div className=" flex flex-col gap-8 border-t border-gray-200 pt-8">
                                {/* Hifz History Table */}
                                {/* <HifzHistoryTable */}
                                <DegreeQuranCircle
                                    history={quranSchool?.degree_quran_circle}
                                />

                                {/* Teacher Notes Card */}
                                {/* <TeacherNotesCard */}
                                <TeacherNote
                                    notes={quranSchool?.teacher_note}
                                />

                                {/* Next Lecture Card */}
                                {/* <NextLectureCard */}
                                <LiveQuranCircles
                                    lectures={
                                        quranSchool?.chapter_in_qurans
                                            ?.live_quran_circles
                                    }
                                />

                                {/* Exam Schedule Table */}
                                {/* <ExamScheduleTable */}
                                <DegreeQuranExam
                                    exams={quranSchool?.degree_quran_exam}
                                />

                                {/* Attendance Log */}
                                {/* <AttendanceLog */}
                                <DegreePresenceAndAbsence
                                    log={
                                        quranSchool?.degree_presence_and_absence
                                    }
                                />

                                {/* Certificate Download Card */}
                                {/* <CertificateDownloadCard */}
                                <CertificateQuran
                                    certificates={
                                        quranSchool?.certificate_quran
                                    }
                                />

                                {/* Downloadable Files Card */}
                                {/* <DownloadableFilesCard */}
                                <FileAndLibrarys
                                    files={
                                        quranSchool?.chapter_in_qurans
                                            ?.file_and_librarys
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuranSchoolDetails;
