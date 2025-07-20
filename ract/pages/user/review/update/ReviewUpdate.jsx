/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Check, Eye, EyeOff, X, Trash2, Star } from "lucide-react";

// API
import {
    userGetReviewById,
    userUpdateReview,
    userDeleteReview,
} from "../../../../api/user/authUser";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function ReviewUpdate() {
    const { reviewId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [reviewData, setReviewData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    // Fetch review data
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { data, error } = await userGetReviewById(reviewId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_User}/review`);
                } else {
                    setReviewData(data);
                    setIsVisible(data.is_visible);

                    // Set form values
                    setValue("first_name", data.first_name);
                    // setValue("email", data.email);
                    setValue("rating", data.rating.toString());
                    setValue("message", data.message);
                }
            } catch (error) {
                console.error("Error fetching review:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_User}/review`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReview();
    }, [reviewId, navigate, setValue]);

    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = {
                ...formData,
                rating: parseInt(formData.rating),
                is_visible: isVisible,
                status: reviewData.status, // Preserve the existing status
            };

            const { data, error } = await userUpdateReview(
                reviewId,
                updateData
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث التقييم بنجاح");
                navigate(`/${App_User}/review`);
            }
        } catch (error) {
            console.error("Error updating review:", error);
            Toast("error", "حدث خطأ أثناء التحديث");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await userDeleteReview(reviewId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف التقييم بنجاح");
                navigate(`/${App_User}/review`);
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const changeStatus = async (newStatus) => {
        try {
            setIsLoading(true);
            const { error } = await userUpdateReview(reviewId, {
                status: newStatus,
            });

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تغيير الحالة");
            } else {
                Toast("success", "تم تحديث حالة التقييم بنجاح");
                setReviewData((prev) => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error("Error changing status:", error);
            Toast("error", "حدث خطأ أثناء تغيير الحالة");
        } finally {
            setIsLoading(false);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={20}
                    className={`${
                        i < rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                    }`}
                />
            );
        }
        return stars;
    };

    const getStatusText = (status) => {
        switch (status) {
            case "publication":
                return "منشور";
            case "under-processing":
                return "قيد المعالجة";
            case "unacceptable":
                return "مرفوض";
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "publication":
                return "bg-green-100 text-green-800";
            case "under-processing":
                return "bg-yellow-100 text-yellow-800";
            case "unacceptable":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (isLoading && !reviewData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!reviewData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate(`/${App_User}/review`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>
                        <h1 className="text-3xl font-bold mr-2 text-black">
                            تعديل التقييم
                        </h1>
                    </div>

                    <div className="flex gap-2 hidden">
                        <button
                            onClick={() => changeStatus("publication")}
                            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                                reviewData.status === "publication"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            <Check size={16} />
                            منشور
                        </button>
                        <button
                            onClick={() => changeStatus("under-processing")}
                            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                                reviewData.status === "under-processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            <Check size={16} />
                            قيد المعالجة
                        </button>
                        <button
                            onClick={() => changeStatus("unacceptable")}
                            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                                reviewData.status === "unacceptable"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            <X size={16} />
                            مرفوض
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <form
                        onSubmit={handleSubmit(handleUpdate)}
                        className="space-y-6 flex flex-col gap-6"
                    >
                        {/* First Name */}
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                الاسم الأول*
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("first_name", {
                                    required: "هذا الحقل مطلوب",
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.first_name.message}
                                </p>
                            )}
                        </div>

                        {/* Rating */}
                        <div>
                            <label
                                htmlFor={`star-4`}
                                className="block text-sm font-bold text-black mb-1"
                            >
                                التقييم*
                            </label>
                            <div className="rating-stars flex justify-around">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star}>
                                        <input
                                            type="radio"
                                            id={`star-${star}`}
                                            name="rating"
                                            value={star}
                                            className="hidden"
                                            {...register("rating", {
                                                required: "هذا الحقل مطلوب.",
                                            })}
                                            autoComplete="off"
                                        />
                                        <label
                                            htmlFor={`star-${star}`}
                                            className={`text-5xl cursor-pointer ${
                                                watch("rating") >= star
                                                    ? "text-amber-400"
                                                    : ""
                                            }`}
                                            // style={{
                                            //     color:
                                            //         watch("rating") >= star
                                            //             ? "#ffc107"
                                            //             : "#e4e5e9",
                                            // }}
                                        >
                                            ★
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.rating && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>

                        {/* Message Content */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                محتوى التقييم*
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("message", {
                                    required: "هذا الحقل مطلوب",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "يجب أن تحتوي الرسالة على 10 حرف على الأقل",
                                    },
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        {/* Visibility Toggle */}
                        <div className="flex justify-start">
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

                        {/* Form Actions */}
                        <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                حذف التقييم
                            </button>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/${App_User}/review`)
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`}
                                >
                                    {isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ التغييرات"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">
                                هل أنت متأكد من حذف هذا التقييم؟ لا يمكن التراجع
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

export default ReviewUpdate;
