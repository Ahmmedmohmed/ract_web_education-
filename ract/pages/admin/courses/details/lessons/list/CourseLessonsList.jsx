/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
    Video,
    FileText,
    Edit,
    Trash,
    File,
    Download,
    Link as LinkIcon,
    UploadCloud,
    Eye,
    EyeOff,
    List,
    Save,
    Lock,
    Unlock,
    X,
    Upload,
    Frown,
    ArrowRight,
    Loader2,
    Plus,
    Clock,
    NotepadText,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";

// api
import {
    publicGetSectionInCourseById,
    publicGetLessonsInCourse,
    publicUpdateLessonInCourse,
    publicDeleteLessonInCourse,
    // adminUploadLessonInCourseFile,
    // adminDeleteLessonInCourseFile,
} from "../../../../../../api/public/authPublic";

// plugin
import Toast from "../../../../../../plugin/Toast";

function CourseLessonsList() {
    const navigate = useNavigate();
    const { courseId, sectionId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [section, setSection] = useState(null);
    const [lessons, setLessons] = useState([]);

    const [isExpanded, setIsExpanded] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [showVideoUpload, setShowVideoUpload] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isFree, setIsFree] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [urlError, setUrlError] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        lessonId: null,
        message: "",
    });

    useEffect(() => {
        const fetchSection = async () => {
            try {
                setIsLoading(true);

                // Fetch section data
                const { data, error } = await publicGetSectionInCourseById(
                    sectionId
                );
                if (error) {
                    // throw new Error(error.message);
                    Toast("error", error.message || "حدث خطأ أثناء جلب القسم");
                    navigate(`/${App_Admin}/courses/${courseId}`);
                }
                setSection(data);

                // Fetch lessons for this section
                const lessonsResponse = await publicGetLessonsInCourse(
                    sectionId
                );
                if (lessonsResponse.error) {
                    throw new Error(lessonsResponse.error.message);
                }
                setLessons(lessonsResponse.data);
            } catch (error) {
                setError(error.message || "حدث خطأ أثناء جلب البيانات");
                Toast("error", error.message || "حدث خطأ أثناء جلب البيانات");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSection();
    }, [sectionId]);

    const getItemIcon = (type) => {
        switch (type) {
            case "video":
                return <Video size={20} className={`text-blue-600`} />;
            case "assessment":
                return <FileText size={20} className="text-yellow-600" />;
            default:
                return <File size={20} className="text-blue-600" />;
        }
    };

    const toggleExpand = (lessonId) => {
        setLessons(
            lessons.map((lesson) =>
                lesson.id === lessonId
                    ? { ...lesson, isExpanded: !lesson.isExpanded }
                    : lesson
            )
        );
    };

    const toggleFileUpload = (lessonId) => {
        setLessons(
            lessons.map((lesson) =>
                lesson.id === lessonId
                    ? { ...lesson, showFileUpload: !lesson.showFileUpload }
                    : lesson
            )
        );
    };

    const toggleVideoUpload = (lessonId) => {
        setLessons(
            lessons.map((lesson) =>
                lesson.id === lessonId
                    ? { ...lesson, showVideoUpload: !lesson.showVideoUpload }
                    : lesson
            )
        );
    };

    const toggleVisibility = async (lessonId, currentVisibility) => {
        try {
            const newVisibility = !currentVisibility;
            const response = await publicUpdateLessonInCourse(lessonId, {
                is_visible: newVisibility,
            });

            if (response.error) {
                throw new Error(response.error.message);
            }

            setLessons(
                lessons.map((lesson) =>
                    lesson.id === lessonId
                        ? { ...lesson, is_visible: newVisibility }
                        : lesson
                )
            );

            Toast("success", "تم تحديث حالة الدرس بنجاح");
        } catch (error) {
            Toast("error", error.message || "حدث خطأ أثناء التحديث");
        }
    };

    const toggleFree = async (lessonId, currentFreeStatus) => {
        try {
            const newFreeStatus = !currentFreeStatus;
            const response = await publicUpdateLessonInCourse(lessonId, {
                is_free: newFreeStatus,
            });

            if (response.error) {
                throw new Error(response.error.message);
            }

            setLessons(
                lessons.map((lesson) =>
                    lesson.id === lessonId
                        ? { ...lesson, is_free: newFreeStatus }
                        : lesson
                )
            );

            Toast("success", "تم تحديث حالة الدرس بنجاح");
        } catch (error) {
            Toast("error", error.message || "حدث خطأ أثناء التحديث");
        }
    };

    const handleFileUpload = async (lessonId, e) => {
        if (e.target.files && e.target.files.length > 0) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                Array.from(e.target.files).forEach((file) => {
                    formData.append("files", file);
                });

                const response = "x";
                // await adminUploadLessonInCourseFile(
                //     lessonId,
                //     formData
                // );
                if (response.error) {
                    throw new Error(response.error.message);
                }

                setLessons(
                    lessons.map((lesson) =>
                        lesson.id === lessonId
                            ? {
                                  ...lesson,
                                  files: [...lesson.files, ...response.data],
                              }
                            : lesson
                    )
                );

                Toast("success", "تم رفع الملفات بنجاح");
            } catch (error) {
                Toast("error", error.message || "حدث خطأ أثناء رفع الملفات");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleVideoUpload = async (lessonId, e) => {
        if (e.target.files && e.target.files[0]) {
            try {
                setIsUploading(true);
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("video", file);

                const response = await publicUpdateLessonInCourse(
                    lessonId,
                    formData
                );
                if (response.error) {
                    throw new Error(response.error.message);
                }

                setLessons(
                    lessons.map((lesson) =>
                        lesson.id === lessonId
                            ? {
                                  ...lesson,
                                  video_file: response.data.video_file,
                                  video_url: "",
                              }
                            : lesson
                    )
                );

                Toast("success", "تم رفع الفيديو بنجاح");
            } catch (error) {
                Toast("error", error.message || "حدث خطأ أثناء رفع الفيديو");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleVideoUrlUpdate = async (lessonId) => {
        // Validate URL
        if (!videoUrl.trim()) {
            setUrlError("الرجاء إدخال رابط الفيديو");
            return;
        }

        try {
            const response = await publicUpdateLessonInCourse(lessonId, {
                video_url: videoUrl,
                video_file: null,
            });

            if (response.error) {
                throw new Error(response.error.message);
            }

            setLessons(
                lessons.map((lesson) =>
                    lesson.id === lessonId
                        ? {
                              ...lesson,
                              video_url: videoUrl,
                              video_file: null,
                          }
                        : lesson
                )
            );

            setShowVideoUpload(false);
            Toast("success", "تم تحديث رابط الفيديو بنجاح");
        } catch (error) {
            Toast("error", error.message || "حدث خطأ أثناء تحديث رابط الفيديو");
        }
    };

    const confirmDeleteFile = (lessonId, fileId) => {
        setFileToDelete({ lessonId, fileId });
        setShowDeleteConfirm(true);
    };

    const handleDeleteFile = async () => {
        if (!fileToDelete) return;

        try {
            const response = "x";
            // await adminDeleteLessonInCourseFile(
            //     fileToDelete.lessonId,
            //     fileToDelete.fileId
            // );

            if (response.error) {
                throw new Error(response.error.message);
            }

            setLessons(
                lessons.map((lesson) =>
                    lesson.id === fileToDelete.lessonId
                        ? {
                              ...lesson,
                              files: lesson.files.filter(
                                  (f) => f.id !== fileToDelete.fileId
                              ),
                          }
                        : lesson
                )
            );

            Toast("success", "تم حذف الملف بنجاح");
        } catch (error) {
            Toast("error", error.message || "حدث خطأ أثناء حذف الملف");
        } finally {
            setShowDeleteConfirm(false);
            setFileToDelete(null);
        }
    };

    const handleDownloadFile = (file) => {
        const link = document.createElement("a");
        link.href = file.content;
        link.download = file.name;
        link.click();
    };

    const handleDelete = (lessonId) => {
        setDeleteConfirmation({
            show: true,
            lessonId,
            message: "هل أنت متأكد من حذف الدرس؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { data, error } = await publicDeleteLessonInCourse(
                deleteConfirmation.lessonId
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setLessons(
                    lessons.filter(
                        (question) =>
                            question.id !== deleteConfirmation.lessonId
                    )
                );
                Toast("success", "تم حذف الدرس بنجاح");
                navigate(`/${App_Admin}/courses/${courseId}`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            lessonId: null,
            message: "",
        });
    };

    // const handleDeleteLesson = async (lessonId) => {
    //     try {
    //         const response = await publicDeleteLessonInCourse(lessonId);
    //         if (response.error) {
    //             throw new Error(response.error.message);
    //         }

    //         setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    //         Toast("success", "تم حذف الدرس بنجاح");
    //     } catch (error) {
    //         Toast("error", error.message || "حدث خطأ أثناء حذف الدرس");
    //     }
    // };

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

    // console.log(`lessons`, lessons);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-start items-center gap-2 mb-8">
                    <button
                        onClick={() =>
                            navigate(`/${App_Admin}/courses/${courseId}`)
                        }
                        className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-4">
                        <span>إدارة قسم</span>
                        <span>({section?.title})</span>
                    </h1>
                </div>

                {/* Add Lesson Button */}
                <div className="flex justify-between items-center  border-b border-gray-300 card p-6 shadow-lg ">
                    <h2 className="text-xl font-bold text-black">
                        محتوى القسم
                    </h2>

                    <button
                        onClick={() =>
                            navigate(
                                `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons/create`
                            )
                        }
                        className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition`}
                    >
                        <Plus size={16} className="ml-1" />
                        إضافة درس جديد
                    </button>
                </div>

                {/* Lessons List */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    {lessons.length === 0 ? (
                        <div className="flex flex-col items-center text-center p-8 border border-dashed border-gray-100 rounded-lg">
                            <FileText
                                size={48}
                                className="mx-auto text-gray-400 mb-3"
                            />
                            <h3 className="text-lg font-medium mb-2">
                                لا توجد دروس بعد
                            </h3>
                            <p className="text-gray-500 mb-4">
                                قم بإضافة دروس لهذا القسم
                            </p>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons/create`
                                    )
                                }
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md`}
                            >
                                إضافة درس جديد
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 flex flex-col gap-4">
                            {lessons?.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className={`relative p-4 border border-gray-300 rounded-lg shadow-sm ${
                                        !lesson.is_visible ? "opacity-70" : ""
                                    }`}
                                >
                                    <span className="absolute text-lg font-bold -right-7 top-1/2 -translate-y-1/2">
                                        {index + 1}
                                    </span>

                                    <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={() => toggleExpand(lesson.id)}
                                    >
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                {getItemIcon(lesson.type)}
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-black flex items-center">
                                                    <span
                                                        className="truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px]"
                                                        title={lesson.title}
                                                    >
                                                        {lesson.title}
                                                    </span>

                                                    {!lesson.is_visible && (
                                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded mr-2 flex-shrink-0">
                                                            مخفي
                                                        </span>
                                                    )}

                                                    {lesson.is_free && (
                                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2 flex-shrink-0">
                                                            مجاني
                                                        </span>
                                                    )}
                                                </h4>

                                                <p className="text-sm text-gray-500 flex items-center gap-4">
                                                    <span>
                                                        {lesson.type === "video"
                                                            ? "فيديو"
                                                            : lesson.type ===
                                                              "assessment"
                                                            ? "اختبار"
                                                            : "محتوى"}
                                                    </span>

                                                    <span className="flex items-center ">
                                                        <Clock
                                                            size={12}
                                                            className={`me-1 text-blue-600`}
                                                        />
                                                        {lesson.duration &&
                                                            `${lesson.duration} `}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center gap-2 space-x-0 space-x-reverse flex-shrink-0"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                className={`p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded`}
                                                onClick={() =>
                                                    navigate(
                                                        `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons/${lesson?.id}/students/answers`
                                                    )
                                                }
                                                title="واجبات الدرس"
                                            >
                                                <NotepadText size={18} />
                                            </button>

                                            <button
                                                className={`p-1.5 hover:bg-gray-100 rounded ${
                                                    lesson.is_free
                                                        ? "text-green-600"
                                                        : "text-gray-500"
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFree(
                                                        lesson.id,
                                                        lesson.is_free
                                                    );
                                                }}
                                                title={
                                                    lesson.is_free
                                                        ? "جعل المحتوى مدفوع"
                                                        : "جعل المحتوى مجاني"
                                                }
                                            >
                                                {lesson.is_free ? (
                                                    <Unlock size={18} />
                                                ) : (
                                                    <Lock size={18} />
                                                )}
                                            </button>

                                            <button
                                                className={`p-1.5 hover:bg-gray-100 rounded ${
                                                    lesson.is_visible
                                                        ? `text-blue-600`
                                                        : "text-gray-500"
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleVisibility(
                                                        lesson.id,
                                                        lesson.is_visible
                                                    );
                                                }}
                                                title={
                                                    lesson.is_visible
                                                        ? "إخفاء الدرس"
                                                        : "إظهار الدرس"
                                                }
                                            >
                                                {lesson.is_visible ? (
                                                    <Eye size={18} />
                                                ) : (
                                                    <EyeOff size={18} />
                                                )}
                                            </button>

                                            <button
                                                className={`p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded`}
                                                onClick={() => {
                                                    navigate(
                                                        `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons/update/${lesson.id}`
                                                    );
                                                }}
                                                title="تعديل الدرس"
                                            >
                                                <Edit size={18} />
                                            </button>

                                            <button
                                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded"
                                                onClick={(e) => {
                                                    // e.stopPropagation();
                                                    // handleDeleteLesson(
                                                    //     lesson.id
                                                    // );
                                                    handleDelete(lesson.id);
                                                }}
                                                title="حذف الدرس"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded content */}
                                    {lesson.isExpanded && (
                                        <div className="mt-4 pt-3 border-t border-gray-200">
                                            {lesson.description && (
                                                <p className="text-gray-600 mb-3">
                                                    {lesson.description}
                                                </p>
                                            )}

                                            {/* Video content section */}
                                            {lesson.type === "video" && (
                                                <div className="mb-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h5 className="font-medium text-black">
                                                            محتوى الفيديو
                                                        </h5>

                                                        <button
                                                            className={`text-sm text-blue-600 flex items-center hover:text-blue-700`}
                                                            onClick={(e) => {
                                                                // e.stopPropagation();
                                                                // toggleVideoUpload(
                                                                //     lesson.id
                                                                // );
                                                                navigate(
                                                                    `/${App_Admin}/courses/${courseId}/sections/${sectionId}/lessons/update/${lesson.id}`
                                                                );
                                                            }}
                                                        >
                                                            <Edit
                                                                size={16}
                                                                className="ml-1"
                                                            />
                                                            {lesson.video_url ||
                                                            lesson.video_file
                                                                ? "تغيير الفيديو"
                                                                : "إضافة فيديو"}
                                                        </button>
                                                    </div>

                                                    {/* X */}
                                                    {/* Choies Vidoe or Url */}
                                                    {lesson.showVideoUpload && (
                                                        <div className="border border-dashed rounded-md p-4 mb-3 border-gray-100">
                                                            <div className="mb-3 flex flex-col gap-4">
                                                                <div className="flex flex-row items-center gap-6 mb-3">
                                                                    <label className="inline-flex items-center whitespace-nowrap">
                                                                        <input
                                                                            type="radio"
                                                                            name={`videoSource-${lesson.id}`}
                                                                            value="url"
                                                                            checked={
                                                                                !videoFile
                                                                            }
                                                                            onChange={() =>
                                                                                setVideoFile(
                                                                                    null
                                                                                )
                                                                            }
                                                                            className="ml-2"
                                                                        />
                                                                        <span className="text-sm flex items-center">
                                                                            <LinkIcon
                                                                                size={
                                                                                    14
                                                                                }
                                                                                className="ml-1"
                                                                            />
                                                                            رابط
                                                                            فيديو
                                                                        </span>
                                                                    </label>

                                                                    <label className="inline-flex items-center whitespace-nowrap">
                                                                        <input
                                                                            type="radio"
                                                                            name={`videoSource-${lesson.id}`}
                                                                            value="file"
                                                                            checked={
                                                                                !!videoFile
                                                                            }
                                                                            onChange={() =>
                                                                                setVideoFile(
                                                                                    {}
                                                                                )
                                                                            }
                                                                            className="ml-2"
                                                                        />
                                                                        <span className="text-sm flex items-center">
                                                                            <Upload
                                                                                size={
                                                                                    14
                                                                                }
                                                                                className="ml-1"
                                                                            />
                                                                            رفع
                                                                            ملف
                                                                        </span>
                                                                    </label>
                                                                </div>

                                                                {!videoFile ? (
                                                                    <div>
                                                                        <label
                                                                            htmlFor={`video-url-${lesson.id}`}
                                                                            className="block text-sm font-medium text-black mb-2"
                                                                        >
                                                                            رابط
                                                                            الفيديو
                                                                        </label>
                                                                        <div className="flex flex-col gap-2">
                                                                            <div className="flex gap-2">
                                                                                <input
                                                                                    type="url"
                                                                                    id={`video-url-${lesson.id}`}
                                                                                    name={`video-url-${lesson.id}`}
                                                                                    placeholder="أدخل رابط الفيديو (YouTube, etc.)"
                                                                                    className={`flex-1 p-2 border rounded-md outline-0
                                                                                    focus:ring-1 focus:border-blue-500
                                                                                    transition-all duration-500
                                                                                    ${
                                                                                        urlError
                                                                                            ? "border-red-500"
                                                                                            : "border-gray-300"
                                                                                    }`}
                                                                                    value={
                                                                                        videoUrl
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setVideoUrl(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        );
                                                                                        setUrlError(
                                                                                            ""
                                                                                        );
                                                                                    }}
                                                                                    autoComplete="off"
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleVideoUrlUpdate(
                                                                                            lesson.id
                                                                                        )
                                                                                    }
                                                                                    className={`px-3 py-2 bg-blue-600 text-white rounded-md flex items-center`}
                                                                                >
                                                                                    <Save
                                                                                        size={
                                                                                            16
                                                                                        }
                                                                                        className="ml-1"
                                                                                    />
                                                                                    حفظ
                                                                                </button>
                                                                            </div>
                                                                            {urlError && (
                                                                                <p className="text-red-500 text-xs mt-1">
                                                                                    {
                                                                                        urlError
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <label
                                                                            htmlFor={`video-file-${lesson.id}`}
                                                                            className="block text-sm font-medium text-black mb-2"
                                                                        >
                                                                            ملف
                                                                            الفيديو
                                                                        </label>
                                                                        <div className="flex items-stretch gap-2">
                                                                            <input
                                                                                type="file"
                                                                                id={`video-file-${lesson.id}`}
                                                                                name={`video-file-${lesson.id}`}
                                                                                accept="video/*"
                                                                                className={`block w-full text-sm
                                                                                text-gray-500
                                                                                file:mr-4 file:py-2 file:px-4
                                                                                file:rounded-md file:border-0
                                                                                file:text-sm file:font-semibold
                                                                                file:bg-blue-50 file:text-blue-700
                                                                                hover:file:bg-blue-100 file:transition-all
                                                                                file:duration-500 file:cursor-pointer
                                                                                cursor-pointer
                                                                                px-2 pt-1 pb-1 border border-gray-300 rounded-md
                                                                                focus:ring-1 focus:border-blue-500
                                                                                outline-0 transition-all duration-500 `}
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleVideoUpload(
                                                                                        lesson.id,
                                                                                        e
                                                                                    )
                                                                                }
                                                                                autoComplete="off"
                                                                            />

                                                                            {videoFile &&
                                                                                videoFile.name && (
                                                                                    <div className="flex justify-between items-center">
                                                                                        <button
                                                                                            type="button"
                                                                                            // onClick={() => handleSaveVideoFile(lesson.id)}
                                                                                            className={`px-3 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm`}
                                                                                        >
                                                                                            <Save
                                                                                                size={
                                                                                                    16
                                                                                                }
                                                                                                className="ml-1"
                                                                                            />
                                                                                            حفظ
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Y */}
                                                    {/* Display current video */}
                                                    {/* {(lesson.video_url ||
                                                        lesson.video_file) &&
                                                        !lesson.showVideoUpload && (
                                                            <div className="mt-3 p-3 bg-gray-50 border border-gray-400 rounded-md">
                                                                {lesson.video_url ? (
                                                                    <div className="">
                                                                        <div className="flex items-center borde">
                                                                            <a
                                                                                href={
                                                                                    lesson.video_url
                                                                                }
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                dir="rtl"
                                                                                className="text-blue-600 text-sm hover:underline truncate"
                                                                            >
                                                                                {
                                                                                    lesson.video_url
                                                                                }
                                                                            </a>

                                                                            <LinkIcon
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="ms-2 w-20 text-blue-500 block"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    lesson.video_file && (
                                                                        <div className="overflow-hidden">
                                                                            <p className="text-sm mb-2 overflow-hidden">
                                                                                <span className="font-medium overflow-hidden">
                                                                              
                                                                                    الملف:
                                                                                </span>{" "}
                                                                                {
                                                                                    lesson
                                                                                        .video_file
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                            {lesson.video_file && (
                                                                                <video
                                                                                    controls
                                                                                    className="w-full rounded-md max-h-60"
                                                                                    src={
                                                                                        lesson
                                                                                            .video_file
                                                                                            .url ||
                                                                                        lesson.video_url
                                                                                    }
                                                                                >
                                                                                    المتصفح
                                                                                    الخاص
                                                                                    بك
                                                                                    لا
                                                                                    يدعم
                                                                                    تشغيل
                                                                                    الفيديو.
                                                                                </video>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )} */}
                                                    {/*  */}
                                                    <div className="mt-3 p-3 bg-gray-50 border border-gray-400 rounded-md">
                                                        {lesson.video_url ? (
                                                            <div className="overflow-hidden">
                                                                <p className="text-sm mb-2 overflow-hidden">
                                                                    <span className="font-medium overflow-hidden">
                                                                        الرابط:
                                                                    </span>{" "}
                                                                    {
                                                                        lesson.video_file
                                                                    }
                                                                </p>
                                                                {lesson.video_url &&
                                                                lesson.video_url.includes(
                                                                    "youtube"
                                                                ) ? (
                                                                    <iframe
                                                                        className="w-full rounded-md max-h-96"
                                                                        src={`https://www.youtube.com/embed/${
                                                                            lesson.video_url
                                                                                .split(
                                                                                    "v="
                                                                                )[1]
                                                                                .split(
                                                                                    "&"
                                                                                )[0]
                                                                        }`}
                                                                        title="YouTube video player"
                                                                        frameBorder="0"
                                                                        allowFullScreen
                                                                    />
                                                                ) : (
                                                                    <video
                                                                        controls
                                                                        className="w-full rounded-md max-h-96 overflow-hidden"
                                                                        src={
                                                                            lesson.video_url
                                                                        }
                                                                    >
                                                                        المتصفح
                                                                        الخاص بك
                                                                        لا يدعم
                                                                        تشغيل
                                                                        الفيديو.
                                                                    </video>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <p className="text-sm mb-2 overflow-hidden">
                                                                    <span className="font-medium overflow-hidden">
                                                                        الملف:
                                                                    </span>{" "}
                                                                    {/* {
                                                                        lesson.video_file
                                                                    } */}
                                                                </p>

                                                                <video
                                                                    controls
                                                                    className="w-full rounded-md max-h-96 overflow-hidden"
                                                                    src={
                                                                        lesson.video_file
                                                                    }
                                                                >
                                                                    المتصفح
                                                                    الخاص بك لا
                                                                    يدعم تشغيل
                                                                    الفيديو.
                                                                </video>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Attached files section */}
                                            <div className="mt-8">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h5 className="font-medium text-black">
                                                        الملفات المرفقة
                                                    </h5>

                                                    {/* <button
                                                        className="text-sm text-blue-600 flex items-center hover:text-blue-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleFileUpload(
                                                                lesson.id
                                                            );
                                                        }}
                                                    >
                                                        <UploadCloud
                                                            size={16}
                                                            className="ml-1"
                                                        />
                                                        إضافة ملف
                                                    </button> */}
                                                </div>

                                                {/* X */}
                                                {lesson.showFileUpload && (
                                                    <div className="border border-dashed rounded-md p-4 mb-3 border-gray-100">
                                                        <input
                                                            type="file"
                                                            id={`file-upload-${lesson.id}`}
                                                            name={`file-upload-${lesson.id}`}
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleFileUpload(
                                                                    lesson.id,
                                                                    e
                                                                )
                                                            }
                                                            multiple
                                                        />
                                                        <label
                                                            htmlFor={`file-upload-${lesson.id}`}
                                                            className="flex flex-col items-center justify-center cursor-pointer"
                                                        >
                                                            <UploadCloud
                                                                size={24}
                                                                className="text-gray-400 mb-2"
                                                            />
                                                            <span
                                                                className={`text-sm font-medium text-blue-600`}
                                                            >
                                                                {isUploading
                                                                    ? "جاري الرفع..."
                                                                    : "اختر ملفات للرفع"}
                                                            </span>
                                                            <span className="text-xs text-gray-500 mt-1">
                                                                يمكنك اختيار عدة
                                                                ملفات في نفس
                                                                الوقت
                                                            </span>
                                                        </label>

                                                        {lesson.uploaded_files &&
                                                            lesson
                                                                .uploaded_files
                                                                .length > 0 && (
                                                                <div className="mt-4">
                                                                    <div className="space-y-2 mb-3">
                                                                        <h6 className="text-sm font-medium text-black">
                                                                            الملفات
                                                                            المختارة:
                                                                        </h6>

                                                                        <div className="flex flex-col gap-2">
                                                                            {lesson.uploaded_files.map(
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
                                                                                            {file.url && (
                                                                                                <button
                                                                                                    className={`p-1.5 text-gray-500 hover:text-blue-600 rounded transition-all duration-500`}
                                                                                                    onClick={(
                                                                                                        e
                                                                                                    ) => {
                                                                                                        e.stopPropagation();
                                                                                                        window.open(
                                                                                                            file.url,
                                                                                                            "_blank"
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    <Download
                                                                                                        size={
                                                                                                            16
                                                                                                        }
                                                                                                    />
                                                                                                </button>
                                                                                            )}

                                                                                            <button
                                                                                                className="p-1.5 text-gray-500 hover:text-red-600 rounded transition-all duration-500"
                                                                                                onClick={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    e.stopPropagation();
                                                                                                    confirmDeleteFile(
                                                                                                        lesson.id,
                                                                                                        file.id
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <Trash
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
                                                    </div>
                                                )}

                                                {/* {lesson.uploaded_files.map(
                                                    (file, index) => (
                                                        <div key={index}>
                                                            <span>
                                                                {file.name}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleDownloadFile(
                                                                        file
                                                                    )
                                                                }
                                                            >
                                                                تحميل
                                                            </button>
                                                        </div>
                                                    )
                                                )} */}

                                                {/* Y */}
                                                {lesson.uploaded_files &&
                                                lesson.uploaded_files.length >
                                                    0 &&
                                                !lesson.showFileUpload ? (
                                                    <div className="space-y-2 flex flex-col gap-2">
                                                        {lesson.uploaded_files.map(
                                                            (file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-300 shadow-sm"
                                                                >
                                                                    <div className="flex items-center truncate max-w-[70%]">
                                                                        <File
                                                                            size={
                                                                                16
                                                                            }
                                                                            className="ml-2 text-gray-500 flex-shrink-0"
                                                                        />
                                                                        <span
                                                                            className={`text-sm truncate text-blue-500`}
                                                                        >
                                                                            {
                                                                                file.name
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <div className="flex space-x-1 space-x-reverse flex-shrink-0">
                                                                        {/* {file.url && ( */}
                                                                        <button
                                                                            className={`p-1.5 text-gray-500 hover:text-blue-600 rounded`}
                                                                            onClick={(
                                                                                e
                                                                            ) => {
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
                                                                            <Download
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </button>
                                                                        {/* )} */}
                                                                        <button
                                                                            className="p-1.5 text-gray-500 hover:text-red-600 rounded"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                confirmDeleteFile(
                                                                                    lesson.id,
                                                                                    file.id
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Trash
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
                                                ) : (
                                                    !lesson.showFileUpload && (
                                                        <div className="flex items-center gap-4 ps-4 text-md text-gray-800 italic">
                                                            <Frown size={16} />
                                                            <span>
                                                                لا توجد ملفات
                                                                مرفقة
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delete File Confirmation */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-black">
                                    حذف الملف
                                </h3>

                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-700 mb-4">
                                    {deleteConfirmation.message}
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() =>
                                            setShowDeleteConfirm(false)
                                        }
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        onClick={handleDeleteFile}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/*  */}
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

export default CourseLessonsList;
