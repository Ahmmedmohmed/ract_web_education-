/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    ArrowRight,
    Video,
    FileText,
    Upload,
    Plus,
    Trash,
    AlertTriangle,
    Eye,
    EyeOff,
    Save,
    Check,
    MessageSquare,
    Unlock,
    Lock,
    X,
    Loader2,
    Hash,
    Percent,
    User,
    Calendar,
    Download,
    File,
    MoreVertical,
} from "lucide-react";

// api
import {
    publicGetLessonInCourseById,
    publicUpdateLessonInCourse,
    publicUpdateStudentAnswerInCourseStatus,
} from "../../../../../../api/public/authPublic";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";

function StudentAnswers() {
    const navigate = useNavigate();
    const { courseId, sectionId, lessonId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [lessonStudentAnswers, setLessonStudentAnswers] = useState(true);

    const dropdownRef = useRef(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (messageId) => {
        setActiveDropdown(activeDropdown === messageId ? null : messageId);
    };

    // Fetch lesson data
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetLessonInCourseById(
                    lessonId
                );

                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب بيانات الدرس"
                    );
                    navigate(
                        `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
                    );
                } else {
                    setLessonStudentAnswers(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching lesson:", error);
                Toast("error", "حدث خطأ أثناء جلب بيانات الدرس");
                navigate(
                    `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleStatusChange = async (messageId, newStatus) => {
        try {
            const { data, error } =
                await publicUpdateStudentAnswerInCourseStatus(
                    messageId,
                    newStatus
                );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setLessonStudentAnswers({
                    ...lessonStudentAnswers,
                    studentanswers: lessonStudentAnswers.studentanswers.map(
                        (answer) =>
                            answer.id === messageId
                                ? { ...answer, status: newStatus }
                                : answer
                    ),
                });
                Toast("success", "تم تحديث حالة الرسالة بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        setActiveDropdown(null);
    };

    //
    const handleDownloadFile = (file) => {
        const link = document.createElement("a");
        link.href = file.content;
        link.download = file.name;
        link.click();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`StudentAnswers`, lessonStudentAnswers);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center ">
                        <button
                            onClick={() => {
                                navigate(
                                    `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons`
                                );
                                // moveBack();
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة واجبات الطلاب
                        </h1>
                    </div>
                </div>

                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : lessonStudentAnswers?.studentanswers.length === 0 ? (
                        <div className="text-4xl bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-600">
                                لم يتم إرسال واجبات حتي الان
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6 flex flex-col gap-8">
                            {lessonStudentAnswers?.studentanswers.map(
                                (answer, index) => (
                                    <div
                                        key={index}
                                        className={`bg-white rounded-lg shadow-lg overflow-hidden"
                                            ${
                                                answer.status === "new"
                                                    ? `border-r-4 border-blue-500`
                                                    : answer.status ===
                                                      "under-processing"
                                                    ? "border-s-4 border-amber-500"
                                                    : ""
                                            }
                                            `}
                                        // data-aos="fade-up"
                                    >
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <h2 className="text-2xl font-semibold text-gray-800">
                                                        {lessonStudentAnswers
                                                            ?.studentanswers
                                                            ?.length - index}
                                                        # إجابة الطالب
                                                    </h2>

                                                    {/* <p className="text-gray-600">
                                                    (
                                                    {result.question_bank.title}
                                                    )
                                                </p> */}
                                                </div>

                                                <div className="mt-4 md:mt-0">
                                                    <span
                                                        className={`px-4 py-2 rounded-full text-2xl font-medium 
                                                            ${
                                                                answer?.percentage >=
                                                                50
                                                                    ? `bg-blue-100 text-blue-800`
                                                                    : "bg-red-100 text-red-800"
                                                            }
                                                        `}
                                                    >
                                                        {answer.degree}
                                                    </span>
                                                </div>

                                                <div
                                                    className="relative"
                                                    ref={
                                                        activeDropdown ===
                                                        answer.id
                                                            ? dropdownRef
                                                            : null
                                                    }
                                                >
                                                    <button
                                                        className="p-2 rounded-full hover:bg-gray-100 transition-all"
                                                        onClick={() =>
                                                            toggleDropdown(
                                                                answer.id
                                                            )
                                                        }
                                                    >
                                                        <MoreVertical
                                                            size={20}
                                                        />
                                                    </button>

                                                    {activeDropdown ===
                                                        answer.id && (
                                                        <div className="absolute left-0 bg-white shadow-lg rounded-md py-1 w-40 z-10 transition-all">
                                                            <button
                                                                onClick={() => {
                                                                    handleStatusChange(
                                                                        answer.id,
                                                                        "reply"
                                                                    );
                                                                }}
                                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                            >
                                                                <Check
                                                                    size={16}
                                                                    className="ml-2 text-green-500"
                                                                />
                                                                تم التصحيح
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    handleStatusChange(
                                                                        answer.id,
                                                                        "under-processing"
                                                                    );
                                                                }}
                                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                            >
                                                                <MessageSquare
                                                                    size={16}
                                                                    className="ml-2 text-yellow-500"
                                                                />
                                                                قيد المعالجة
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {answer?.uploaded_files?.length >
                                                0 && (
                                                <div className="grid grid-cols-1  gap-4 mb-6">
                                                    <div className="w-full flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
                                                        <div className="flex flex-col gap-2 w-full">
                                                            {answer?.uploaded_files?.map(
                                                                (
                                                                    file,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-center justify-between p-2 bg-gray-200 rounded shadow-sm"
                                                                    >
                                                                        <div className="flex items-center truncate max-w-[70%]">
                                                                            <File
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="ml-2 text-gray-500 flex-shrink-0"
                                                                            />
                                                                            <span className="text-sm truncate text-black">
                                                                                {
                                                                                    file.name
                                                                                }
                                                                            </span>
                                                                        </div>

                                                                        <div className="flex space-x-1 space-x-reverse flex-shrink-0">
                                                                            <button
                                                                                className={`p-1.5 text-blue-500 hover:text-blue-600 rounded transition-all duration-500`}
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    // e.stopPropagation();
                                                                                    // window.open(
                                                                                    //     file.content,
                                                                                    //     "_blank"
                                                                                    // );
                                                                                    handleDownloadFile(
                                                                                        file
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Download
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center">
                                                            <User
                                                                className="text-white "
                                                                size={18}
                                                            />
                                                        </span>

                                                        <span className="text-gray-700">
                                                            الطالب:
                                                        </span>
                                                    </div>

                                                    <p className="text-2xl font-bold ">
                                                        {answer.student.id}){" "}
                                                        {
                                                            answer.student
                                                                .first_name
                                                        }{" "}
                                                        {
                                                            answer.student
                                                                .last_name
                                                        }
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center">
                                                            <Calendar
                                                                className="text-white "
                                                                size={18}
                                                            />
                                                        </span>

                                                        <span className="text-gray-700">
                                                            تاريخ الإجراء:
                                                        </span>
                                                    </div>

                                                    <p className="text-2xl font-bold ">
                                                        {new Date(
                                                            answer.created_at
                                                        ).toLocaleDateString(
                                                            "ar-EG"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentAnswers;
