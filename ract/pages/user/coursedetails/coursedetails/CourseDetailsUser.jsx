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
} from "lucide-react";

// api
import {
    appGetCourseAllById,
    appGetCourseFetchEnrollStatus,
} from "../../../../api/app/authApp";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// data
import { Courses } from "../../../../data/data";

// utils
import {
    App_User,
    nameMainColor,
    phonenumber,
} from "../../../../utils/constants";

// component
import VideoPlayer from "../videoplayer/VideoPlayer";
import CourseContent from "../coursecontent/CourseContent";
import AssessmentQuiz from "../assessment/Assessment";

// assets
// import videoerror from "../../../../assets/video/course-video-1.mp4";
import videoerror from "../../../../assets/video/course-video-1-.mp4";

function CourseDetailsUser() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();
    // console.log(`userData`, userData);

    const [course, setCourse] = useState(null);
    const [enrolledStatus, setEnrolledStatus] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});
    const [activeContent, setActiveContent] = useState();
    const [activeS, setActiveS] = useState("files");

    useEffect(() => {
        const fetchCourseEnrollStatus = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseFetchEnrollStatus(
                    userData?.id,
                    courseId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب حالة الاشتراك"
                    );
                    // console.log();
                }

                // console.log(``);
                if (data.bool == false) {
                    Toast("error", "لست مشترك في هذه الدورة");
                    navigate(`/${App_User}/courses`);
                } else {
                    setEnrolledStatus("success");
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب حالة الاشتراك"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (userData?.id) {
            fetchCourseEnrollStatus();
        }
    }, [courseId, userData?.id]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseAllById(courseId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/${App_User}/courses`);
                } else {
                    // Set form values
                    setCourse(data);
                    if (
                        data.sections?.length > 0 &&
                        data.sections[0].lessons?.length > 0
                    ) {
                        setActiveContent(data.sections[0].lessons[0]);
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/${App_User}/courses`);
            } finally {
                setIsLoading(false);
            }
        };

        if (enrolledStatus === "success") {
            fetchCourse();
        }
    }, [courseId, enrolledStatus, navigate]);

    useEffect(() => {
        const fetchStudentAnswerInCourseStatus = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseFetchEnrollStatus(
                    userData?.id,
                    courseId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب حالة الاشتراك"
                    );
                    // console.log();
                }

                // console.log(``);
                if (data.bool == false) {
                    Toast("error", "لست مشترك في هذه الدورة");
                    navigate(`/${App_User}/courses`);
                } else {
                    setEnrolledStatus("success");
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب حالة الاشتراك"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (userData?.id) {
            fetchStudentAnswerInCourseStatus();
        }
    }, [courseId, userData?.id]);

    const toggleExpandItem = (sectionId, itemId) => {
        const key = `${sectionId}-${itemId}`;
        setExpandedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // course?.sections[0]?.items[0] || null

    // // console.log(``, activeContent);

    const handleQuizComplete = (score) => {
        // console.log(`Quiz completed with score: ${score}%`);
        // Here you can add logic to save the score to a database
    };

    //
    const handleDownloadFile = (file) => {
        const link = document.createElement("a");
        link.href = file.content;
        link.download = file.name;
        link.click();
    };

    //
    const SimpleVideoPlayer = ({ videoUrl, title }) => {
        if (!videoUrl)
            return (
                <div className="p-4 text-center text-gray-500">
                    الفيديو غير متوفر
                </div>
            );

        return (
            <VideoPlayer
                videoUrl={videoUrl}
                title={title}
                isProtected={false}
            />
        );
    };

    //
    const handleCertificate = () => {
        // إنشاء نص الرسالة مع تفاصيل المنتجات
        const message = `أريد شهادة الدورة التالية:
                \n${course?.id}) ${course?.title}   
                \n\nالطالب: 
                \n${userData?.id}) ${userData?.full_name}
                \nشكراً!
            `;

        // ترميز الرسالة لاستخدامها في رابط واتساب
        const encodedMessage = encodeURIComponent(message);

        // إنشاء رابط واتساب
        const whatsappUrl = `https://wa.me/+2${phonenumber}?text=${encodedMessage}`;

        // فتح الرابط في نافذة جديدة
        window.open(whatsappUrl, "_blank");
    };

    //
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // console.log(`course`, course);
    // console.log(`activeContent`, activeContent);

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
                                {course?.title}
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6 text-2xl">
                        {course?.description}
                    </p>

                    {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {course?.title}
                    </h1>

                    <p className="text-gray-600 mb-6 text-2xl">
                        {course?.description}
                    </p> */}

                    <div className="flex flex-wrap gap-6 text-2xl">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={18} />
                            <span>{course?.duration}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Users size={18} />
                            <span>{course?.total_enrolled_students} طالب</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen size={18} />
                            <span>{course?.total_section} درس</span>
                        </div>

                        {/* <div
                            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-500 transition-all duration-500"
                            onClick={() => {
                                navigate(
                                    `/${App_User}/courses/${courseId}/students/chat/${course?.user?.id}/${userData?.id}`
                                );
                            }}
                        >
                            <Send size={18} /> <span>مراسلة</span>
                        </div> */}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* Video */}
                        {activeContent?.video_url ||
                        activeContent?.video_file ? (
                            <>
                                <SimpleVideoPlayer
                                    videoUrl={
                                        activeContent?.video_url ||
                                        activeContent?.video_file ||
                                        videoerror
                                    }
                                    title={activeContent?.title}
                                />

                                {/* <VideoPlayer
                                    videoUrl={
                                        activeContent?.video_url ||
                                        activeContent?.video_file ||
                                        videoerror
                                    }
                                    // videoUrl={videoerror}
                                    title={activeContent?.title}
                                    isProtected={true}
                                /> */}
                                {/* </> */}
                                {/* ) : activeContent?.type === "assessment" &&
                          activeContent?.questions ? ( */}
                            </>
                        ) : !activeContent?.video_url ||
                          !activeContent?.video_file ? (
                            <>
                                <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
                                    <h2 className="text-xl font-bold mb-4">
                                        هذا الدرس عبارة عن ملفات للمراجعة قم
                                        بتحميلها
                                    </h2>
                                    <p className="text-gray-600">
                                        يرجى اختيار محتوى من القائمة
                                    </p>
                                </div>
                            </>
                        ) : (
                            // <AssessmentQuiz
                            //     questions={activeContent?.questions}
                            //     onComplete={handleQuizComplete}
                            // />
                            <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
                                <h2 className="text-xl font-bold mb-4">
                                    المحتوى غير متاح
                                </h2>
                                <p className="text-gray-600">
                                    يرجى اختيار محتوى من القائمة
                                </p>
                            </div>
                        )}

                        {/* Title */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold mb-4 text-black">
                                {activeContent?.title}
                            </h2>

                            <p className="text-gray-800">
                                {activeContent?.description}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                onClick={() => {
                                    setActiveS(`files`);
                                }}
                            >
                                كتيب المحاضرة
                            </button>

                            <button
                                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                onClick={() => {
                                    setActiveS(`questions`);
                                }}
                            >
                                أختبار المحاضرة
                            </button>

                            <button
                                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                onClick={() => {
                                    navigate(
                                        `/${App_User}/courses/${courseId}/lessons/${activeContent?.id}/students/duties`
                                    );
                                }}
                            >
                                إرسال الواجب
                            </button>

                            <button
                                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                onClick={() => {
                                    handleCertificate();
                                }}
                            >
                                شهادة الدورة
                            </button>
                        </div>

                        {/* Files */}
                        {activeS === "files" &&
                        activeContent?.uploaded_files &&
                        activeContent?.uploaded_files?.length > 0 ? (
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                                <h3 className="text-lg font-bold mb-4 text-black">
                                    الملفات المرفقة
                                </h3>
                                <div className="space-y-2 flex flex-col gap-2">
                                    {activeContent?.uploaded_files.map(
                                        (file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-300 shadow-sm"
                                            >
                                                <div className="flex items-center truncate max-w-[70%]">
                                                    <File
                                                        size={16}
                                                        className="ml-2 text-gray-500 flex-shrink-0"
                                                    />
                                                    <span
                                                        className={`text-sm truncate text-blue-500`}
                                                    >
                                                        {file.name}
                                                    </span>
                                                </div>

                                                <div className="flex space-x-1 space-x-reverse flex-shrink-0">
                                                    {/* {file.url && ( */}
                                                    <button
                                                        className={`p-1.5 text-gray-500 hover:text-blue-600 rounded`}
                                                        onClick={(e) => {
                                                            // e.stopPropagation();
                                                            // window.open(
                                                            //     file.url,
                                                            //     "_blank"
                                                            // );
                                                            handleDownloadFile(
                                                                file
                                                            );
                                                        }}
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <></>
                            // <div className="flex items-center gap-4 ps-4 text-md text-gray-800 italic">
                            //     <Frown size={16} />
                            //     <span>لا توجد ملفات مرفقة</span>
                            // </div>
                        )}

                        {/* Questions */}
                        {activeS === "questions" && (
                            <>
                                {activeContent?.questions &&
                                activeContent?.questions?.length ? (
                                    <div>
                                        <AssessmentQuiz
                                            key={`${activeContent.type}-${activeContent.title}`}
                                            questions={activeContent?.questions}
                                            onComplete={handleQuizComplete}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {activeContent?.questions_google_iframe ? (
                                    <>
                                        <div
                                            className=""
                                            dangerouslySetInnerHTML={{
                                                __html: activeContent?.questions_google_iframe,
                                            }}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}

                                {activeContent?.questions_google_url ? (
                                    <div className="flex">
                                        <a
                                            href={
                                                activeContent?.questions_google_url
                                            }
                                            target="_blank"
                                            className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                        >
                                            <span className="span">
                                                أفتح صفحة الاختبارات
                                            </span>
                                        </a>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}

                        {/*  */}
                        {/* <div
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4 cursor-pointer"
                            onClick={() => {
                                navigate(
                                    `/${App_User}/courses/${courseId}/lessons/${activeContent?.id}/students/duties`
                                );
                            }}
                        >
                            <h3 className="text-lg font-bold text-black">
                                إرسال الواجبات وتحميل نموذج الاجابة
                            </h3>
                        </div> */}
                    </div>

                    <div>
                        <CourseContent
                            sections={course?.sections}
                            onSelectItem={setActiveContent}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetailsUser;
