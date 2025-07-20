/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff, Trash2 } from "lucide-react";

// api
import {
    publicDeleteQuranCircle,
    publicGetQuranCircleById,
    publicUpdateQuranCircle,
} from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { formatDateTime, validateImageUrl } from "../../../../utils/helpers";

function QuranCircleUpdate() {
    const { quranpathId, chapterinquranId, qurancircleId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [classRoomData, setClassRoomData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchQuranCircle = async () => {
            try {
                const { data, error } = await publicGetQuranCircleById(
                    qurancircleId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(
                        `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                    );
                } else {
                    setClassRoomData(data);
                    setIsVisible(data.is_visible);

                    // Set form values
                    setValue("date_time", formatDateTime(data.date_time));

                    setValue("present_roses", data.present_roses);
                    setValue("past_roses", data.past_roses);
                }
            } catch (error) {
                console.error("Error fetching section:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuranCircle();
    }, [qurancircleId, navigate, setValue, quranpathId, chapterinquranId]);

    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = new FormData();
            updateData.append("date_time", formData.date_time);

            updateData.append("present_roses", formData.present_roses);
            updateData.append("past_roses", formData.past_roses || "");

            updateData.append("is_visible", isVisible);

            const { data, error } = await publicUpdateQuranCircle(
                qurancircleId,
                updateData
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث الورد بنجاح");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
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

            const { error } = await publicDeleteQuranCircle(qurancircleId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف الورد بنجاح");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
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
                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            تعديل الورد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            <div>
                                <label
                                    htmlFor="date_time"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    التاريخ*
                                </label>
                                <input
                                    type="datetime-local"
                                    id="date_time"
                                    name="date_time"
                                    placeholder="مثال: دورة التحصيلي رياضيات"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer`}
                                    {...register("date_time", {
                                        required: "الموعد مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.date_time && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.date_time.message}
                                    </p>
                                )}
                            </div>

                            {/* الورد الحاضر */}
                            <div>
                                <label
                                    htmlFor="present_roses"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    الورد الحاضر*
                                </label>
                                <input
                                    type="text"
                                    id="present_roses"
                                    name="present_roses"
                                    placeholder="مثال: كمي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("present_roses", {
                                        required: "الورد الحاضر مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.present_roses && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.present_roses.message}
                                    </p>
                                )}
                            </div>

                            {/* الورد الماضي */}
                            <div>
                                <label
                                    htmlFor="past_roses"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    الورد الماضي*
                                </label>
                                <input
                                    type="text"
                                    id="past_roses"
                                    name="past_roses"
                                    placeholder="مثال: كمي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("past_roses", {
                                        required: "الورد الماضي مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.past_roses && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.past_roses.message}
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
                                    حذف الورد
                                </button>

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                        onClick={() =>
                                            navigate(
                                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
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
                                هل أنت متأكد من حذف هذا الورد؟ لا يمكن التراجع
                                عن هذا الإجراء.
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

export default QuranCircleUpdate;
