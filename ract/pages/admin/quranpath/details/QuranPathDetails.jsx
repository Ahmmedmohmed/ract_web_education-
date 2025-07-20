/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowRight,
    Calendar,
    CircleDashed,
    Clock,
    Edit,
    Eye,
    EyeOff,
    File,
    FileText,
    ListTodo,
    Loader2,
    Menu,
    Plus,
    Presentation,
    Trash,
    Users,
} from "lucide-react";

// api
import {
    publicDeleteChapterInQuran,
    publicGetQuranPathById,
    publicUpdateClassRoomVisibility,
    publicUpdateReviewLevelVisibility,
} from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin } from "../../../../utils/constants";
import { formatDateAR, formatDuration } from "../../../../utils/helpers";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function QuranPathDetails() {
    const { quranpathId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [quranpathData, setQuranPathData] = useState(null);
    const [classRoomsData, setClassRoomsData] = useState(null);
    const [reviewLevelsData, setReviewLevelsData] = useState(null);
    const [chapterInQuransData, setChapterInQuransData] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        courseId: null,
        message: "",
    });

    useEffect(() => {
        const fetchQuranPath = async () => {
            try {
                const { data, error } = await publicGetQuranPathById(
                    quranpathId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/quranpaths`);
                    setIsLoading(false);
                } else {
                    setQuranPathData(data);
                    setClassRoomsData(data?.class_rooms);
                    setReviewLevelsData(data?.review_levels);
                    setChapterInQuransData(data?.chapter_in_qurans);
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
    }, [quranpathId, navigate]);

    //
    const handleVisibilityChangeClassRoom = async (
        classroomId,
        newVisibility
    ) => {
        try {
            const { data, error } = await publicUpdateClassRoomVisibility(
                classroomId,
                newVisibility
            );
            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setClassRoomsData(
                    classRoomsData.map((course) =>
                        course.id === classroomId
                            ? { ...course, is_visible: newVisibility }
                            : course
                    )
                );
                Toast("success", "تم تحديث حالة السنه الدراسية بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    //
    const handleVisibilityChangeReviewLevel = async (
        reviewLevelId,
        newVisibility
    ) => {
        try {
            const { data, error } = await publicUpdateReviewLevelVisibility(
                reviewLevelId,
                newVisibility
            );
            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setReviewLevelsData(
                    reviewLevelsData.map((course) =>
                        course.id === reviewLevelId
                            ? { ...course, is_visible: newVisibility }
                            : course
                    )
                );
                Toast("success", "تم تحديث حالة الفصل المستوي الدراسي بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    //
    const handleVisibilityChangeChapterInQuran = async (
        chapterInQuranId,
        newVisibility
    ) => {
        try {
            const { data, error } = await publicUpdateClassRoomVisibility(
                chapterInQuranId,
                newVisibility
            );
            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setChapterInQuransData(
                    chapterInQuransData.map((course) =>
                        course.id === chapterInQuranId
                            ? { ...course, is_visible: newVisibility }
                            : course
                    )
                );
                Toast("success", "تم تحديث حالة الفصل الدراسي بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    const handleDelete = (courseId) => {
        setDeleteConfirmation({
            show: true,
            courseId,
            message: "هل أنت متأكد من حذف هذا الفصل الدراسي؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { error } = await publicDeleteChapterInQuran(
                deleteConfirmation.courseId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setChapterInQuransData(
                    chapterInQuransData.filter(
                        (course) => course.id !== deleteConfirmation.courseId
                    )
                );
                Toast("success", "تم حذف الفصل الدراسي بنجاح");
                navigate(`/${App_Admin}/quranpaths`);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            courseId: null,
            message: "",
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`quranpathData`, quranpathData);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-between items-center gap-2 mb-8">
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    navigate(`/${App_Admin}/quranpaths`)
                                }
                                className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold text-gray-800">
                                {quranpathData.title}
                            </h1>
                        </div>
                    </div>

                    {classRoomsData && classRoomsData?.length > 0 ? (
                        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-600 text-center">
                                    السنوات الدراسية
                                </h2>
                            </div>

                            <div className="space-y-4 my-12 flex flex-col gap-8">
                                {classRoomsData?.map((classroom, index) => (
                                    <div
                                        key={index}
                                        className={`group card shadow-lg hover:shadow-lg border border-gray-300 transition-all duration-500 
                                                ${
                                                    classroom?.is_visible ===
                                                    false
                                                        ? "bg-gray-200"
                                                        : ""
                                                }
                                            `}
                                    >
                                        <div className="flex flex-col md:flex-row p-4">
                                            <div className="flex-grow flex flex-col justify-between ">
                                                <div className="flex justify-between items-start">
                                                    <Link
                                                    // to={`/${App_Admin}/quranpaths/${quranpathId}/classrooms/${classroom?.id}`}
                                                    >
                                                        <h2
                                                            className={`text-3xl font-bold text-black hover:text-blue-600 transition-all duration-500 hover:transition-all hover:duration-500 group-hover:text-blue-600 truncate`}
                                                        >
                                                            {classroom?.title}
                                                        </h2>
                                                    </Link>

                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                            onClick={() => {
                                                                handleVisibilityChangeClassRoom(
                                                                    classroom?.id,
                                                                    !classroom?.is_visible
                                                                );
                                                            }}
                                                            title={
                                                                classroom?.is_visible ===
                                                                false
                                                                    ? "إظهار السنه الدراسية"
                                                                    : "إخفاء السنه الدراسية"
                                                            }
                                                        >
                                                            {classroom?.is_visible ===
                                                            false ? (
                                                                <EyeOff
                                                                    size={18}
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            )}
                                                        </button>

                                                        <Link
                                                            // admin/quranpaths/1/classrooms/update/1
                                                            to={`/${App_Admin}/quranpaths/${quranpathId}/classrooms/update/${classroom?.id}`}
                                                            className={`p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md`}
                                                            title="تعديل السنه الدراسية"
                                                        >
                                                            <Edit size={18} />
                                                        </Link>
                                                    </div>
                                                </div>

                                                <p className="text-2xl text-gray-600 -mt-2 mb-4 pe-10 line-clamp-1">
                                                    {classroom?.description}
                                                </p>

                                                <div className="flex flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Presentation
                                                            size={16}
                                                            className="ml-1"
                                                        />
                                                        <span>
                                                            {
                                                                classroom?.total_chapter_in_quran
                                                            }
                                                        </span>

                                                        <span>فصول</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {reviewLevelsData && reviewLevelsData?.length > 0 ? (
                        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-600 text-center">
                                    المستويات الدراسية
                                </h2>
                            </div>

                            <div className="space-y-4 my-12 flex flex-col gap-8">
                                {reviewLevelsData?.map((reviewLevel, index) => (
                                    <div
                                        key={index}
                                        className={`group card shadow-lg hover:shadow-lg border border-gray-300 transition-all duration-500 
                                                ${
                                                    reviewLevel?.is_visible ===
                                                    false
                                                        ? "bg-gray-200"
                                                        : ""
                                                }
                                            `}
                                    >
                                        <div className="flex flex-col md:flex-row p-4">
                                            <div className="flex-grow flex flex-col justify-between ">
                                                <div className="flex justify-between items-start">
                                                    <Link
                                                    // to={`/${App_Admin}/quranpaths/${quranpathId}/classrooms/${reviewLevel?.id}`}
                                                    >
                                                        <h2
                                                            className={`text-3xl font-bold text-black hover:text-blue-600 transition-all duration-500 hover:transition-all hover:duration-500 group-hover:text-blue-600 truncate`}
                                                        >
                                                            {reviewLevel?.title}
                                                        </h2>
                                                    </Link>

                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                            onClick={() => {
                                                                handleVisibilityChangeReviewLevel(
                                                                    reviewLevel?.id,
                                                                    !reviewLevel?.is_visible
                                                                );
                                                            }}
                                                            title={
                                                                reviewLevel?.is_visible ===
                                                                false
                                                                    ? "إظهار المستوي"
                                                                    : "إخفاء المستوي"
                                                            }
                                                        >
                                                            {reviewLevel?.is_visible ===
                                                            false ? (
                                                                <EyeOff
                                                                    size={18}
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            )}
                                                        </button>

                                                        <Link
                                                            // /${App_Admin}/quranpaths/:quranpathId/reviewlevels/update/:reviewlevelId
                                                            to={`/${App_Admin}/quranpaths/${quranpathId}/reviewlevels/update/${reviewLevel?.id}`}
                                                            className={`p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md`}
                                                            title="تعديل المستوي"
                                                        >
                                                            <Edit size={18} />
                                                        </Link>
                                                    </div>
                                                </div>

                                                <p className="text-2xl text-gray-600 -mt-2 mb-4 pe-10 line-clamp-1">
                                                    {reviewLevel?.description}
                                                </p>

                                                <div className="flex flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Presentation
                                                            size={16}
                                                            className="ml-1"
                                                        />
                                                        <span>
                                                            {
                                                                reviewLevel?.total_chapter_in_quran
                                                            }
                                                        </span>

                                                        <span>فصول</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {chapterInQuransData && chapterInQuransData?.length > 0 ? (
                        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h2 className="text-3xl font-bold text-blue-600 text-center">
                                    الفصول الدراسية
                                </h2>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/create`
                                        )
                                    }
                                    className={`flex items-center gap-2 px-4 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200`}
                                >
                                    <Plus size={18} />
                                    <span>إضافة فصل جديد</span>
                                </button>
                            </div>

                            <div className="space-y-4 my-12 flex flex-col gap-8">
                                {chapterInQuransData?.map(
                                    (chapterinquran, index) => (
                                        <div
                                            key={index}
                                            className={`group card shadow-lg hover:shadow-lg border border-gray-300 transition-all duration-500 
                                                ${
                                                    chapterinquran?.is_visible ===
                                                    false
                                                        ? "bg-gray-200"
                                                        : ""
                                                }
                                            `}
                                        >
                                            <div className="flex flex-col md:flex-row p-4">
                                                <div
                                                    className="w-full md:min-w-60 md:max-w-60 h-60 md:h-40   overflow-hidden rounded-lg md:ml-4 mb-4 md:mb-0 cursor-pointer border border-gray-300 shadow-md"
                                                    onClick={() => {
                                                        // if (
                                                        //     userData?.id ===
                                                        //     course?.user?.id
                                                        // ) {
                                                        // }
                                                        navigate(
                                                            `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquran?.id}`
                                                        );
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            chapterinquran?.image_url ||
                                                            chapterinquran?.image ||
                                                            noimage
                                                        }
                                                        alt={
                                                            chapterinquran?.title
                                                        }
                                                        onError={(e) => {
                                                            e.target.src =
                                                                noimage;
                                                            e.target.onerror =
                                                                null;
                                                        }}
                                                        loading="lazy"
                                                        className="w-full h-full object-fill md:max-h-40"
                                                    />
                                                </div>

                                                <div className="flex-grow flex flex-col justify-between ">
                                                    <div className="flex justify-between items-start">
                                                        <Link
                                                            to={`/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquran?.id}`}
                                                        >
                                                            <h2
                                                                className={`text-3xl font-bold text-black hover:text-blue-600 transition-all duration-500 hover:transition-all hover:duration-500 group-hover:text-blue-600 truncate`}
                                                            >
                                                                {
                                                                    chapterinquran?.title
                                                                }
                                                            </h2>
                                                        </Link>

                                                        <div className="flex space-x-2">
                                                            <button
                                                                className={`p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded`}
                                                                onClick={() => {
                                                                    // handleDeleteSection(
                                                                    //     section?.id
                                                                    // );
                                                                    navigate(
                                                                        `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquran?.id}`
                                                                    );
                                                                }}
                                                                title="عرض الفصل"
                                                            >
                                                                <FileText
                                                                    size={18}
                                                                />
                                                            </button>

                                                            <button
                                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                                onClick={() => {
                                                                    handleVisibilityChangeChapterInQuran(
                                                                        chapterinquran?.id,
                                                                        !chapterinquran?.is_visible
                                                                    );
                                                                }}
                                                                title={
                                                                    chapterinquran?.is_visible ===
                                                                    false
                                                                        ? "إظهار الفصل الدراسي"
                                                                        : "إخفاء الفصل الدراسي"
                                                                }
                                                            >
                                                                {chapterinquran?.is_visible ===
                                                                false ? (
                                                                    <EyeOff
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <Eye
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                )}
                                                            </button>

                                                            <Link
                                                                // admin/quranpaths/1/chapterinqurans/create
                                                                to={`/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/update/${chapterinquran?.id}`}
                                                                className={`p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md`}
                                                                title="تعديل الفصل الدراسي"
                                                            >
                                                                <Edit
                                                                    size={18}
                                                                />
                                                            </Link>

                                                            <button
                                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                                                                onClick={() => {
                                                                    handleDelete(
                                                                        chapterinquran?.id
                                                                    );
                                                                }}
                                                                title="حذف الفصل الدراسي"
                                                            >
                                                                <Trash
                                                                    size={18}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p className="text-2xl text-gray-600 -mt-2 mb-4 pe-10 line-clamp-1">
                                                        {
                                                            chapterinquran?.description
                                                        }
                                                    </p>

                                                    <div className="flex flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Users
                                                                size={16}
                                                                className="ml-1"
                                                            />
                                                            <span>
                                                                {
                                                                    chapterinquran?.total_enrolled_students
                                                                }
                                                            </span>

                                                            <span>طالب</span>
                                                        </div>

                                                        <div className="flex items-center justify-center gap-2">
                                                            <CircleDashed
                                                                size={16}
                                                                className="ml-1"
                                                            />
                                                            <span>
                                                                {
                                                                    chapterinquran?.total_quran_circle
                                                                }
                                                            </span>

                                                            <span>حلقات</span>
                                                        </div>

                                                        <div className="flex items-center justify-center gap-2">
                                                            <ListTodo
                                                                size={16}
                                                                className="ml-1"
                                                            />
                                                            <span>
                                                                {
                                                                    chapterinquran?.total_quran_exam
                                                                }
                                                            </span>

                                                            <span>اختبار</span>
                                                        </div>

                                                        {/* <div className="flex items-center justify-center gap-2">
                                                            <Presentation
                                                                size={16}
                                                                className="ml-1"
                                                            />
                                                            <span>
                                                                {
                                                                    chapterinquran?.total_chapter_in_quran
                                                                }
                                                            </span>

                                                            <span>فصول</span>
                                                        </div> */}

                                                        <div className="flex items-center justify-center gap-2">
                                                            <File
                                                                size={16}
                                                                className="ml-1"
                                                            />
                                                            <span>
                                                                {
                                                                    chapterinquran?.total_file_and_library
                                                                }
                                                            </span>

                                                            <span>ملف</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                {deleteConfirmation?.show && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4 text-black">
                                تأكيد الحذف
                            </h3>

                            <p className="mb-6">{deleteConfirmation.message}</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() =>
                                        setDeleteConfirmation({
                                            show: false,
                                            courseId: null,
                                            message: "",
                                        })
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>

                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default QuranPathDetails;
