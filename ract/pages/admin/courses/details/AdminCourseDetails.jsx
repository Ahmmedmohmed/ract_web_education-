/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Users,
    Clock,
    Layers,
    ArrowRight,
    Plus,
    Edit,
    Video,
    FileText,
    Check,
    AlertCircle,
    Eye,
    EyeOff,
    Trash,
    Lock,
    Unlock,
    Loader2,
    Calendar,
} from "lucide-react";
import { sl } from "date-fns/locale";
import { FiList } from "react-icons/fi";

// api
import {
    publicDeleteSectionInCourse,
    publicGetCourseById,
    publicGetSectionsInCourse,
    publicSearchSectionsInCourseId,
    publicUpdateSectionInCourseStatus,
    publicUpdateSectionInCourseVisibility,
} from "../../../../api/public/authPublic";

// data
import { Courses, Students } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// hooks
import { useMoveBack } from "../../../../hooks/useMoveBack";

// utils
import { formatDateAR, formatDuration } from "../../../../utils/helpers";
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// component
// import CourseLessonsList from "./lessons/list/CourseLessonsList";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function AdminCourseDetails() {
    const { courseId } = useParams();
    const moveBack = useMoveBack();

    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [deletingQuestion, setDeletingQuestion] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        sectionId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetCourseById(courseId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/${App_Admin}/courses`);
                } else {
                    // Set form values
                    setCourse(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/${App_Admin}/courses`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, navigate]);

    useEffect(() => {
        // fetchSectionsInCourse();
    }, [courseId, currentPage, selectedStatus]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            // fetchSectionsInCourse();
            // setMessages(allMessages);
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    const fetchSectionsInCourse = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await publicGetSectionsInCourse(
                courseId,
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الاقسام");
            } else {
                setSections(data);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
            );
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const { data, error } = await publicSearchSectionsInCourseId(
                courseId,
                searchQuery,
                currentPage
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setSections(data);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error searching messages:", error);
            Toast("error", "حدث خطأ أثناء البحث");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchAction = () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() !== "") {
            setIsLoading(true);
            setSearchTimeout(
                setTimeout(() => {
                    handleSearch();
                }, 500)
            );
            // } else if (searchQuery.trim() === "" && messages.length === 0) {
        } else if (searchQuery.trim() === "") {
            fetchSectionsInCourse();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    // const toggleCategory = (categoryId) => {
    //     setExpandedCategoryId(
    //         expandedCategoryId === categoryId ? null : categoryId
    //     );
    // };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStatusChange = async (sectionId, newStatus) => {
        try {
            const { data, error } = await publicUpdateSectionInCourseStatus(
                sectionId,
                newStatus
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setSections(
                    sections.map((section) =>
                        section.id === sectionId
                            ? { ...section, status: newStatus }
                            : section
                    )
                );
                Toast("success", "تم تحديث حالة القسم بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleVisibilityChange = async (sectionId, newVisibility) => {
        try {
            // console.log(`--`, sectionId, newVisibility);

            const { data, error } = await publicUpdateSectionInCourseVisibility(
                sectionId,
                newVisibility
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setCourse({
                    ...course,
                    sections: course.sections.map((section) =>
                        section.id === sectionId
                            ? { ...section, is_visible: newVisibility }
                            : section
                    ),
                });
                Toast("success", "تم تحديث حالة القسم بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleDelete = (sectionId) => {
        setDeleteConfirmation({
            show: true,
            sectionId,
            message: "هل أنت متأكد من حذف الاختبار؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { data, error } = await publicDeleteSectionInCourse(
                deleteConfirmation.sectionId
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                // setSections(
                //     sections.filter(
                //         (question) =>
                //             question.id !== deleteConfirmation.questionId
                //     )
                // );
                Toast("success", "تم حذف القسم بنجاح");
                navigate(`/${App_Admin}/courses`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            sectionId: null,
            message: "",
        });
    };

    const resetFilters = () => {
        setSelectedStatus("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    // console.log(`course`, course);

    return (
        <>
            <div className="space-y-6">
                {/* Header with back button */}
                <div className="flex items-center justify-start mb-8">
                    <button
                        onClick={() => {
                            navigate(`/${App_Admin}/courses`);
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 text-black"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <h1 className="text-2xl font-bold mr-2 text-black">
                        إدارة الدورة
                        {/* ({course?.title}) */}
                    </h1>
                </div>

                {/* Course header card */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div
                            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                        ></div>
                    </div>
                ) : (
                    <div className="card p-0 overflow-hidden my-8">
                        <div className="relative ">
                            <div className="relative h-60 md:h-80 border-b border-gray-300">
                                <img
                                    src={
                                        course?.image_url ||
                                        course?.image ||
                                        noimage
                                    }
                                    alt={course?.title}
                                    onError={(e) => {
                                        e.target.src = noimage;
                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                    }}
                                    loading="lazy"
                                    className="w-full h-full object-full"
                                />
                            </div>

                            {/* Edit button overlay */}
                            <Link
                                to={`/${App_Admin}/courses/update/${course?.id}/`}
                                className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
                                title="تعديل الدورة"
                            >
                                <Edit size={20} className=" transition-all" />
                            </Link>
                        </div>

                        <div className="p-6">
                            <h2 className="text-3xl font-bold mb-2 text-black">
                                {course?.title}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {course?.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-lg font-bold">
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => {
                                        // openStudentsList
                                        // navigate(
                                        //     `/${App_Admin}/courses/${courseId}/students`
                                        // );
                                    }}
                                >
                                    <Users
                                        size={18}
                                        className={`ml-2 text-blue-600`}
                                    />

                                    <div
                                        className={`flex gap-2 cursor-pointer hover:text-blue-600 transition-colors`}
                                        title="عرض قائمة الطلاب"
                                    >
                                        <p className="font-semibold">
                                            {course?.total_enrolled_students}
                                        </p>

                                        <p
                                            className={`text-gray-500 hover:text-blue-600`}
                                        >
                                            طلاب
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Layers
                                        size={18}
                                        className={`ml-2 text-blue-600`}
                                    />

                                    <div className="flex gap-2">
                                        <p className="font-semibold">
                                            {course?.total_section}
                                        </p>

                                        <p className="text-gray-500">أقسام</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <FileText
                                        size={18}
                                        className={`ml-2 text-blue-600`}
                                    />

                                    <div className="flex gap-2">
                                        <p className="font-semibold">
                                            {course?.total_lesson}
                                        </p>

                                        <p className="text-gray-500">دروس</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Clock
                                        size={18}
                                        className={`ml-2 text-blue-600`}
                                    />

                                    <div className="flex gap-2">
                                        <p className="font-semibold">
                                            {/* {formatDuration(course?.duration)} */}
                                            {course?.duration}
                                        </p>
                                        {/* <p className="text-gray-500">مدة الدورة</p> */}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Calendar
                                        size={18}
                                        className={`ml-2 text-blue-600`}
                                    />

                                    <div className="flex gap-2">
                                        <p className="font-semibold">
                                            {formatDateAR(course?.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header Sections */}
                <div className="flex justify-between items-center  border-b border-gray-300 card p-6 shadow-lg ">
                    <h2 className="text-xl font-bold text-black">
                        أقسام ومحتويات الدورة
                    </h2>

                    <button
                        onClick={() => {
                            // setShowAddSectionModal(true);
                            navigate(
                                `/${App_Admin}/courses/${courseId}/sections/create`
                            );
                        }}
                        className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition`}
                    >
                        <Plus size={16} className="ml-1" />
                        إضافة قسم جديد
                    </button>
                </div>

                {/* Course content */}
                <div className="card  p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : course?.sections?.length === 0 ? (
                        <div className="flex flex-col items-center text-center p-8 border border-dashed border-gray-100 rounded-lg">
                            <Layers
                                size={48}
                                className="mx-auto text-gray-400 mb-3"
                            />

                            <h3 className="text-lg font-medium mb-2">
                                لا توجد أقسام بعد
                            </h3>

                            <p className="text-gray-500 mb-4">
                                قم بإضافة أقسام ودروس لهذه الدورة
                            </p>

                            <button
                                onClick={() => {
                                    // setShowAddSectionModal(true);
                                    navigate(
                                        `/${App_Admin}/courses/${courseId}/sections/create`
                                    );
                                }}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md`}
                            >
                                إضافة قسم جديد
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 flex flex-col gap-8">
                            {course?.sections?.map((section, index) => (
                                <div
                                    key={index}
                                    className={`group border border-gray-200 rounded-lg overflow-hidden 
                                        ${
                                            course?.is_visible === false
                                                ? "opacity-70"
                                                : ""
                                        }
                                    `}
                                >
                                    {/* Section header */}
                                    <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="font-bold text-black flex items-center">
                                            <span
                                                className={`truncate group-hover:text-blue-600 transition-all duration-500 max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[300px] cursor-pointer`}
                                                title={section?.title}
                                                onClick={() => {
                                                    navigate(
                                                        `/${App_Admin}/courses/${courseId}/sections/${section?.id}/lessons`
                                                    );
                                                }}
                                            >
                                                {section?.title}
                                            </span>

                                            {section?.is_visible === false && (
                                                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded mr-2 flex-shrink-0">
                                                    مخفي
                                                </span>
                                            )}

                                            {/* {section?.is_free && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2 flex-shrink-0">
                                                    مجاني
                                                </span>
                                            )} */}
                                        </h3>

                                        <div className="flex items-center gap-2 space-x-0 space-x-reverse flex-shrink-0">
                                            {/* <button
                                                className={`p-1.5 hover:bg-gray-100 rounded ${
                                                    section?.isFree
                                                        ? "text-green-600"
                                                        : "text-gray-500"
                                                }`}
                                                onClick={() =>
                                                    handleToggleSectionFree(
                                                        section?.id
                                                    )
                                                }
                                                title={
                                                    section?.isFree
                                                        ? "جعل القسم مدفوع"
                                                        : "جعل القسم مجاني"
                                                }
                                            >
                                                {section?.isFree ? (
                                                    <Unlock size={18} />
                                                ) : (
                                                    <Lock size={18} />
                                                )}
                                            </button> */}

                                            <button
                                                className={`p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded`}
                                                onClick={() => {
                                                    // handleDeleteSection(
                                                    //     section?.id
                                                    // );
                                                    navigate(
                                                        `/${App_Admin}/courses/${courseId}/sections/${section?.id}/lessons`
                                                    );
                                                }}
                                                title="عرض الدروس"
                                            >
                                                <FileText size={18} />
                                            </button>

                                            <button
                                                className={`p-1.5 hover:bg-gray-100 rounded ${
                                                    section?.is_visible
                                                        ? `text-blue-600`
                                                        : "text-gray-500"
                                                }`}
                                                onClick={() => {
                                                    // handleToggleSectionVisibility(
                                                    //     section?.id
                                                    // )
                                                    handleVisibilityChange(
                                                        section?.id,
                                                        section?.is_visible
                                                            ? false
                                                            : true
                                                    );
                                                }}
                                                title={
                                                    section?.is_visible ===
                                                    false
                                                        ? "إظهار القسم"
                                                        : "إخفاء القسم"
                                                }
                                            >
                                                {section?.is_visible ===
                                                false ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </button>

                                            <button
                                                className={`p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded`}
                                                onClick={() => {
                                                    // setActiveSectionId(
                                                    //     section?.id
                                                    // );
                                                    // setShowUpdateSectionModal(
                                                    //     true
                                                    // );
                                                    navigate(
                                                        `/${App_Admin}/courses/${courseId}/sections/update/${section?.id}`
                                                    );
                                                }}
                                                title="تعديل القسم"
                                            >
                                                <Edit size={18} />
                                            </button>

                                            <button
                                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded"
                                                onClick={() => {
                                                    // handleDeleteSection(
                                                    //     section?.id
                                                    // );
                                                    handleDelete(section?.id);
                                                }}
                                                title="حذف القسم"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                            sectionId: null,
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

export default AdminCourseDetails;
