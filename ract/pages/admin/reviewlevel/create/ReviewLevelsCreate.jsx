/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Save,
    ArrowRight,
    Upload,
    Eye,
    EyeOff,
    Loader2,
    X,
    Plus,
} from "lucide-react";

// api
import {
    publicCreateReviewLevel,
    publicGetQuranPathsAdmin,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function ReviewLevelsCreate() {
    const { quranpathId } = useParams();
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [quranPaths, setQuranPaths] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

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

                    setValue("quran_path", quranpathId);
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
    }, [quranpathId, setValue]);

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
    const handleSectionSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const sectionData = new FormData();
            sectionData.append("user", userData?.id || null);
            sectionData.append("quran_path", formData.quran_path || null);

            sectionData.append("title", formData.title);
            sectionData.append("description", formData.description || "");

            sectionData.append("duration", formData.duration || "");

            //
            sectionData.append("stamp_number", JSON.stringify(stampNumber));
            sectionData.append(
                "daily_auscultation",
                JSON.stringify(dailyAuscultation)
            );
            sectionData.append("days_per_week", JSON.stringify(daysPerWeek));
            sectionData.append("duration_seal", JSON.stringify(durationSeal));

            sectionData.append("is_visible", isVisible);

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            // const { data, error } = await publicCreateReviewLevel(sectionData);

            // // console.log(`error`, error);
            // // console.log(`data`, data);

            // if (error) {
            //     if (error.image) {
            //         setErrorsMessage(error.image);
            //         Toast("error", error.image);
            //     } else if (error.message) {
            //         Toast("error", error.message);
            //     }
            // } else {
            //     Toast("success", "تم إنشاء المستوي الدراسي بنجاح");
            //     navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
            // }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إنشاء المستوي الدراسي");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`quranPaths`, quranPaths);
    // console.log(`quranpathId`, quranpathId);

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
                            إضافة مستوي دراسي جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleSectionSubmit)}
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

                            {/*  */}
                            <div className="flex items-center cursor-pointer">
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                                        isVisible
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {isVisible ? (
                                        <Eye
                                            size={16}
                                            className="text-blue-600"
                                        />
                                    ) : (
                                        <EyeOff
                                            size={16}
                                            className="text-gray-600"
                                        />
                                    )}
                                    {isVisible ? "ظاهر" : "مخفي"}
                                </button>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() =>
                                        navigate(
                                            `/${App_Admin}/quranpaths/${quranpathId}`
                                        )
                                    }
                                    disabled={isSubmitting || isLoading}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Save size={18} />
                                    {isSubmitting || isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ المستوي الدراسي"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReviewLevelsCreate;
