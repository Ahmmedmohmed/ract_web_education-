/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Save,
    ArrowRight,
    Upload,
    Eye,
    EyeOff,
    Trash2,
    X,
    Plus,
} from "lucide-react";

// api
import {
    publicDeleteReviewLevel,
    publicGetQuranPathsAdmin,
    publicGetReviewLevelById,
    publicUpdateReviewLevel,
} from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function ReviewLevelUpdate() {
    const { quranpathId, reviewlevelId } = useParams();

    const navigate = useNavigate();
    const [quranPaths, setQuranPaths] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [reviewLevelData, setReviewLevelData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    //
    const [stampNumber, setStampNumber] = useState([""]);
    const [dailyAuscultation, setDailyAuscultation] = useState([""]);
    const [daysPerWeek, setDaysPerWeek] = useState([""]);
    const [durationSeal, setDurationSeal] = useState([""]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

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
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuranPaths();
    }, []);

    useEffect(() => {
        const fetchReviewLevel = async () => {
            try {
                const { data, error } = await publicGetReviewLevelById(
                    reviewlevelId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
                } else {
                    setReviewLevelData(data);
                    setIsVisible(data.is_visible);

                    // Set form values
                    setValue("quran_path", data.quran_path);

                    setValue("title", data.title);
                    setValue("description", data.description);
                    setValue("duration", data.duration);

                    if (data.stamp_number && data.stamp_number?.length > 0) {
                        setStampNumber(data.stamp_number);
                    }

                    if (
                        data.daily_auscultation &&
                        data.daily_auscultation.length > 0
                    ) {
                        setDailyAuscultation(data.daily_auscultation);
                    }

                    if (data.days_per_week && data.days_per_week.length > 0) {
                        setDaysPerWeek(data.days_per_week);
                    }

                    if (data.duration_seal && data.duration_seal.length > 0) {
                        setDurationSeal(data.duration_seal);
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

        fetchReviewLevel();
    }, [reviewlevelId, navigate, setValue, quranPaths]);

    //
    // Functions to handle dynamic fields
    const addStampNumber = () => setStampNumber([...stampNumber, ""]);
    const removeStampNumber = (index) => {
        if (stampNumber.length > 1) {
            const newStampNumber = [...stampNumber];
            newStampNumber.splice(index, 1);
            setStampNumber(newStampNumber);
        }
    };

    const addDailyAuscultation = () =>
        setDailyAuscultation([...dailyAuscultation, ""]);
    const removeDailyAuscultation = (index) => {
        if (dailyAuscultation.length > 1) {
            const newDailyAuscultation = [...dailyAuscultation];
            newDailyAuscultation.splice(index, 1);
            setDailyAuscultation(newDailyAuscultation);
        }
    };

    const addDaysPerWeek = () => setDaysPerWeek([...daysPerWeek, ""]);
    const removeDaysPerWeek = (index) => {
        if (daysPerWeek.length > 1) {
            const newDaysPerWeek = [...daysPerWeek];
            newDaysPerWeek.splice(index, 1);
            setDaysPerWeek(newDaysPerWeek);
        }
    };

    const addDurationSeal = () => setDurationSeal([...durationSeal, ""]);
    const removeDurationSeal = (index) => {
        if (durationSeal.length > 1) {
            const newDurationSeal = [...durationSeal];
            newDurationSeal.splice(index, 1);
            setDurationSeal(newDurationSeal);
        }
    };

    //
    // Handle change for dynamic fields
    const handleStampNumberChange = (index, value) => {
        const newStampNumber = [...stampNumber];
        newStampNumber[index] = value;
        setStampNumber(newStampNumber);
    };

    const handleDailyAuscultationChange = (index, value) => {
        const newDailyAuscultation = [...dailyAuscultation];
        newDailyAuscultation[index] = value;
        setDailyAuscultation(newDailyAuscultation);
    };

    const handleDaysPerWeekChange = (index, value) => {
        const newDaysPerWeek = [...daysPerWeek];
        newDaysPerWeek[index] = value;
        setDaysPerWeek(newDaysPerWeek);
    };

    const handleDurationSealChange = (index, value) => {
        const newDurationSeal = [...durationSeal];
        newDurationSeal[index] = value;
        setDurationSeal(newDurationSeal);
    };

    //
    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = new FormData();
            updateData.append("quran_path", formData.quran_path);

            updateData.append("title", formData.title);
            updateData.append("description", formData.description || "");
            updateData.append("duration", formData.duration || "");

            //
            updateData.append("stamp_number", JSON.stringify(stampNumber));
            updateData.append(
                "daily_auscultation",
                JSON.stringify(dailyAuscultation)
            );
            updateData.append("days_per_week", JSON.stringify(daysPerWeek));
            updateData.append("duration_seal", JSON.stringify(durationSeal));

            updateData.append("is_visible", isVisible);

            const { data, error } = await publicUpdateReviewLevel(
                reviewlevelId,
                updateData
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث المستوي الدراسي بنجاح");
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

            const { error } = await publicDeleteReviewLevel(reviewlevelId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف المستوي الدراسي بنجاح");
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

    if (isLoading && !reviewLevelData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!reviewLevelData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    // console.log(`reviewLevelData`, reviewLevelData);

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
                            تعديل المستوي الدراسي
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="space-y-6 flex flex-col gap-6"
                        >
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

                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    اسم المستوي الدراسي*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: المستوي الاول"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "اسم المستوي الدراسي مطلوب",
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
                                    المدة*
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="مثال: عامين"
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

                            {/* Stamp Number */}
                            <div>
                                <label
                                    htmlFor="stampNumber"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    رقم الختمة*
                                </label>
                                {stampNumber?.map((stampnumber, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            id={
                                                index > 0
                                                    ? `stampNumber${index}`
                                                    : `stampNumber`
                                            }
                                            name={
                                                index > 0
                                                    ? `stampNumber${index}`
                                                    : `stampNumber`
                                            }
                                            placeholder="مثال: 1"
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
                                            value={stampnumber}
                                            onChange={(e) => {
                                                handleStampNumberChange(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeStampNumber(index);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                            disabled={
                                                stampNumber.length === 1 ||
                                                isSubmitting ||
                                                isLoading
                                            }
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addStampNumber}
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة رقم ختمة جديدة</span>
                                </button>
                            </div>

                            {/* Daily Auscultation */}
                            <div>
                                <label
                                    htmlFor="dailyAuscultation"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    التسميع اليومي*
                                </label>
                                {dailyAuscultation?.map(
                                    (requirement, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 mb-2"
                                        >
                                            <input
                                                type="text"
                                                id={
                                                    index > 0
                                                        ? `dailyAuscultation${index}`
                                                        : `dailyAuscultation`
                                                }
                                                name={
                                                    index > 0
                                                        ? `dailyAuscultation${index}`
                                                        : `dailyAuscultation`
                                                }
                                                placeholder="مثال: 6 صفحات"
                                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
                                                value={requirement}
                                                onChange={(e) => {
                                                    handleDailyAuscultationChange(
                                                        index,
                                                        e.target.value
                                                    );
                                                }}
                                                autoComplete="off"
                                                disabled={
                                                    isSubmitting || isLoading
                                                }
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    removeDailyAuscultation(
                                                        index
                                                    );
                                                }}
                                                className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                                disabled={
                                                    dailyAuscultation.length ===
                                                        1 ||
                                                    isSubmitting ||
                                                    isLoading
                                                }
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )
                                )}
                                <button
                                    type="button"
                                    onClick={addDailyAuscultation}
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة تسميع يومي جديد</span>
                                </button>
                            </div>

                            {/* Days Per Week */}
                            <div>
                                <label
                                    htmlFor="daysperweek"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    الأيام أسبوعيًا*
                                </label>

                                {daysPerWeek?.map((daysperweek, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            id={
                                                index > 0
                                                    ? `daysperweek${index}`
                                                    : `daysperweek`
                                            }
                                            name={
                                                index > 0
                                                    ? `daysperweek${index}`
                                                    : `daysperweek`
                                            }
                                            placeholder="مثال: 2"
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
                                            value={daysperweek}
                                            onChange={(e) => {
                                                handleDaysPerWeekChange(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeDaysPerWeek(index);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                            disabled={
                                                daysPerWeek.length === 1 ||
                                                isSubmitting ||
                                                isLoading
                                            }
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addDaysPerWeek}
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة يوم جديد</span>
                                </button>
                            </div>

                            {/* duration_seal */}
                            <div>
                                <label
                                    htmlFor="durationSeal"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    مدة الختمة*
                                </label>

                                {durationSeal?.map((durationSeal, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            id={
                                                index > 0
                                                    ? `durationSeal${index}`
                                                    : `durationSeal`
                                            }
                                            name={
                                                index > 0
                                                    ? `durationSeal${index}`
                                                    : `durationSeal`
                                            }
                                            placeholder="مثال: 12 شهرًا"
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
                                            value={durationSeal}
                                            onChange={(e) => {
                                                handleDurationSealChange(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeDurationSeal(index);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                            disabled={
                                                daysPerWeek.length === 1 ||
                                                isSubmitting ||
                                                isLoading
                                            }
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addDurationSeal}
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة مدة جديدة</span>
                                </button>
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
                                    حذف المستوي الدراسي
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
                                هل أنت متأكد من حذف هذا المستوي الدراسي؟ لا يمكن
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

export default ReviewLevelUpdate;
