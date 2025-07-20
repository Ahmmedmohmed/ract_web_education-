/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff, Trash2 } from "lucide-react";

// api
import {
    publicGetQuranPathsAdmin,
    publicGetClassRoomsAdmin,
    publicGetReviewLevelsAdmin,
    publicGetChapterInQuranById,
    publicUpdateChapterInQuran,
    publicDeleteChapterInQuran,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function ChapterInQuranUpdate() {
    const { quranpathId, chapterinquranId } = useParams();

    const navigate = useNavigate();
    const { userData } = UserDataStore();

    //
    const [quranPaths, setQuranPaths] = useState([]);
    const [classRooms, setClassRooms] = useState([]);
    const [reviewLevels, setReviewLevels] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [classRoomData, setClassRoomData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    //
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    //
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //
    useEffect(() => {
        const fetchQuranPaths = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetQuranPathsAdmin();
                // currentPage,
                // selectedStatus

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب مسارات القران"
                    );
                } else {
                    setQuranPaths(data);
                    // setAllCategories(data.results);
                    // setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    // setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات 2"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuranPaths();
    }, []);

    // Class Rooms
    useEffect(() => {
        const fetchClassRooms = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetClassRoomsAdmin();
                // currentPage,
                // selectedStatus

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                } else {
                    setClassRooms(data);
                    // setAllCategories(data.results);
                    // setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    // setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات 3"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClassRooms();
    }, []);

    // Review Levels
    useEffect(() => {
        const fetchReviewLevels = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetReviewLevelsAdmin();
                // currentPage,
                // selectedStatus

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                } else {
                    setReviewLevels(data);
                    // setAllCategories(data.results);
                    // setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    // setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات 4"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviewLevels();
    }, []);

    useEffect(() => {
        const fetchChapterInQuran = async () => {
            try {
                const { data, error } = await publicGetChapterInQuranById(
                    chapterinquranId
                );

                // console.log(`data`, data);
                // console.log(`error`, error);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات 1"
                    );
                    navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
                } else {
                    setClassRoomData(data);
                    setIsVisible(data.is_visible);

                    // Set form values
                    setValue("quran_path", data.quran_path);
                    setValue("classroom", data.classroom);
                    setValue("review_level", data.review_level);

                    setValue("class_type", data.class_type);

                    setValue("title", data.title);
                    setValue("description", data.description);

                    setValue("maximum_students", data.maximum_students);

                    setValue("date_quran_sessions", data.date_quran_sessions);
                    setValue(
                        "quranic_sciences_lecture_schedule",
                        data.quranic_sciences_lecture_schedule
                    );
                    setValue("approach_quran", data.approach_quran);
                    setValue("quran_sciences", data.quran_sciences);

                    setValue("duration", data.duration);

                    setValue("image_url", data.image_url);

                    // Set image preview if available
                    if (data.image) {
                        setImagePreview(data.image);
                    } else if (data.image_url) {
                        setImagePreview(data.image_url);
                    }
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

        fetchChapterInQuran();
    }, [chapterinquranId, navigate, setValue, quranPaths, quranpathId]);

    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = new FormData();
            updateData.append("classroom", formData.classroom || "");
            updateData.append("review_level", formData.review_level || "");

            updateData.append("class_type", formData.class_type);

            updateData.append("title", formData.title);
            updateData.append("description", formData.description || "");

            updateData.append(
                "maximum_students",
                formData.maximum_students || ""
            );

            updateData.append(
                "date_quran_sessions",
                formData.date_quran_sessions
            );
            updateData.append(
                "quranic_sciences_lecture_schedule",
                formData.quranic_sciences_lecture_schedule
            );
            updateData.append("approach_quran", formData.approach_quran);
            updateData.append("quran_sciences", formData.quran_sciences);

            updateData.append("duration", formData.duration);

            if (imageFile) {
                updateData.append("image", imageFile);
            }
            updateData.append("image_url", formData.image_url || "");

            updateData.append("is_visible", isVisible);

            // for (let [key, value] of updateData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            const { data, error } = await publicUpdateChapterInQuran(
                chapterinquranId,
                updateData
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث الفصل الدراسي بنجاح");
                navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
            }
        } catch (error) {
            console.error("Error updating section:", error);
            Toast("error", "حدث خطأ أثناء التحديث");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);

            const { error } = await publicDeleteChapterInQuran(
                chapterinquranId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف الفصل الدراسي بنجاح");
                navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
            }
        } catch (error) {
            console.error("Error deleting section:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    if (isLoading && !classRoomData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!classRoomData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    // console.log(`classRoomData`, classRoomData);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
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
                            تعديل الفصل الدراسي
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Quran Path */}
                            <div>
                                <label
                                    htmlFor="quran_path"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    مسارات القران*
                                </label>
                                <select
                                    id="quran_path"
                                    name="quran_path"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("quran_path", {
                                        required: "المسار مطلوب",
                                    })}
                                    autoComplete="off"
                                    // disabled={isSubmitting || isLoading}
                                    disabled={true}
                                    required
                                >
                                    <option value="">اختر مسار</option>
                                    {quranPaths?.map((path, index) => (
                                        <option key={index} value={path.id}>
                                            {path.id}) {path.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.quran_path && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.quran_path.message}
                                    </p>
                                )}
                            </div>

                            {quranpathId === "1" ? (
                                <>
                                    {/* Class Room */}
                                    <div>
                                        <label
                                            htmlFor="classroom"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            السنوات الدراسية*
                                        </label>
                                        <select
                                            id="classroom"
                                            name="classroom"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            {...register("classroom", {
                                                required:
                                                    "السنة الدراسية مطلوب",
                                            })}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                            required
                                        >
                                            <option value="">
                                                اختر الفصل الدراسي
                                            </option>
                                            {classRooms?.map(
                                                (classroom, index) => (
                                                    <option
                                                        key={index}
                                                        value={classroom.id}
                                                    >
                                                        {classroom.id}){" "}
                                                        {classroom.title}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {errors.classroom && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.classroom.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                            {quranpathId === "2" ? (
                                <>
                                    {/* review_level */}
                                    <div>
                                        <label
                                            htmlFor="review_level"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            المستويات القران*
                                        </label>
                                        <select
                                            id="review_level"
                                            name="review_level"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            {...register("review_level", {
                                                required:
                                                    "المستويات الدراسية مطلوب",
                                            })}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                            required
                                        >
                                            <option value="">اختر مستوي</option>
                                            {reviewLevels?.map(
                                                (reviewlevel, index) => (
                                                    <option
                                                        key={index}
                                                        value={reviewlevel.id}
                                                    >
                                                        {reviewlevel.id}){" "}
                                                        {reviewlevel.title}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {errors.review_level && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.review_level.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                            {/* النوع */}
                            <div>
                                <label
                                    htmlFor="class_type"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    نوع الفصل*
                                </label>
                                <select
                                    id="class_type"
                                    name="class_type"
                                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 transition-all focus:border-blue-500`}
                                    {...register("class_type", {
                                        required: "نوع الفصل مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">أختر النوع</option>
                                    <option value="male">ذكور</option>
                                    <option value="female">إناث</option>
                                    <option value="mixed">مختلط</option>
                                </select>
                                {errors.class_type && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.class_type.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    اسم الفصل الدراسي*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: فصل الناصر صلاح الدين"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "اسم الفصل الدراسي مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    الوصف
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: خُطَّةٌ مُتكَامِلَةٌ لِخَتْمِ القُرْآنِ حِفْظًا وفَهْمًا."
                                    className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 resize-none`}
                                    {...register("description", {
                                        // required: ``,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    // required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="duration"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    وقت الدراسة*
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="مثال: من الساعة 7 مساء حتي الساعة 8 مساء"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("duration", {
                                        required: "المدة مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.duration && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.duration.message}
                                    </p>
                                )}
                            </div>

                            {/* مواعيد حلقات القرآن */}
                            <div>
                                <label
                                    htmlFor="date_quran_sessions"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    مواعيد حلقات القرآن*
                                </label>
                                <input
                                    type="text"
                                    id="date_quran_sessions"
                                    name="date_quran_sessions"
                                    placeholder="مثال: السبت والثلاثاء 10ص"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("date_quran_sessions", {
                                        required: "مواعيد حلقات القرآن مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.date_quran_sessions && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.date_quran_sessions.message}
                                    </p>
                                )}
                            </div>

                            {/* مواعيد محاضرات علوم القرآن */}
                            <div>
                                <label
                                    htmlFor="quranic_sciences_lecture_schedule"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    مواعيد محاضرات علوم القرآن*
                                </label>
                                <input
                                    type="text"
                                    id="quranic_sciences_lecture_schedule"
                                    name="quranic_sciences_lecture_schedule"
                                    placeholder="مثال: الثلاثاء 11ص"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register(
                                        "quranic_sciences_lecture_schedule",
                                        {
                                            required:
                                                "مواعيد محاضرات علوم القرآن مطلوب",
                                        }
                                    )}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.quranic_sciences_lecture_schedule && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {
                                            errors
                                                .quranic_sciences_lecture_schedule
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* منهج القرآن */}
                            <div>
                                <label
                                    htmlFor="approach_quran"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    منهج القرآن*
                                </label>
                                <input
                                    type="text"
                                    id="approach_quran"
                                    name="approach_quran"
                                    placeholder="مثال: حفظ جزء عم"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("approach_quran", {
                                        required: "منهج القرآن مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.approach_quran && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.approach_quran.message}
                                    </p>
                                )}
                            </div>

                            {/*  علوم القرآن */}
                            <div>
                                <label
                                    htmlFor="quran_sciences"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    علوم القرآن*
                                </label>
                                <input
                                    type="text"
                                    id="quran_sciences"
                                    name="quran_sciences"
                                    placeholder="مثال: التجويد وأحكام النون الساكنة"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("quran_sciences", {
                                        required: "علوم القرآن مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.quran_sciences && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.quran_sciences.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="maximum_students"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الحد الأقصى للطلاب*
                                </label>
                                <input
                                    type="number"
                                    id="maximum_students"
                                    name="maximum_students"
                                    min={0}
                                    placeholder="مثال: 199 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("maximum_students", {
                                        required: "العدد مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "العدد لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.maximum_students && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.maximum_students.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    صورة الفصل الدراسي
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <div className="mb-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto h-32 w-auto object-cover rounded-md"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="mx-auto h-20 w-20 text-gray-400">
                                                <Upload
                                                    size={40}
                                                    className="mx-auto"
                                                />
                                            </div>
                                        )}

                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="image"
                                                className={`relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 transition-all`}
                                            >
                                                <span>قم برفع صورة</span>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    ref={fileInputRef}
                                                    className="sr-only"
                                                    accept="image/*"
                                                    {...register("image")}
                                                    onChange={handleImageChange}
                                                    autoComplete="off"
                                                    disabled={
                                                        isSubmitting ||
                                                        isLoading
                                                    }
                                                />
                                            </label>
                                            <p className="pr-1">
                                                أو اسحب وأفلت
                                            </p>
                                        </div>

                                        <p className="text-xs text-gray-500">
                                            PNG، JPG، GIF حتى 5MB
                                        </p>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="image_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط الصورة
                                </label>
                                <input
                                    type="text"
                                    id="image_url"
                                    name="image_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("image_url", {
                                        validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.image_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image_url.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                        isVisible
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {isVisible ? (
                                        <Eye size={16} />
                                    ) : (
                                        <EyeOff size={16} />
                                    )}
                                    {isVisible ? "ظاهر" : "مخفي"}
                                </button>
                            </div>

                            <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    حذف الفصل الدراسي
                                </button>

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                        onClick={() =>
                                            navigate(
                                                `/${App_Admin}/quranpaths/${quranpathId}`
                                            )
                                        }
                                        disabled={isLoading}
                                    >
                                        إلغاء
                                    </button>

                                    <button
                                        type="submit"
                                        className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                        disabled={isLoading}
                                    >
                                        <Save size={18} />
                                        {isLoading
                                            ? "جاري الحفظ..."
                                            : "حفظ التغييرات"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">
                                هل أنت متأكد من حذف هذا الفصل الدراسي؟ لا يمكن
                                التراجع عن هذا الإجراء.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handleDelete}
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

export default ChapterInQuranUpdate;
